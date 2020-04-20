/* Models */
import { Locker } from 'common/model/Locker';
import { Receiver, ReceiverPersonType } from 'common/model/Receiver';
import { StateLockers } from 'client/model/Redux';

/* Application files */
import { Validator, isRequired, isRequiredIf, isValidEmail, matchesRegex, everyIf } from 'client/lib/validators';

export enum FormField {
    PERSON_TYPE = 'personType',
    SCHOOL = 'school',
    SCHOOL_GRADE = 'grade',
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    CARETAKER_FIRST_NAME = 'caretakerFirstName',
    CARETAKER_LAST_NAME = 'caretakerLastName',
    EMAIL = 'email',
    PHONE = 'phone',
    STREET = 'street',
    STREET_NUMBER = 'streetNumber',
    POSTCODE = 'postcode',
    CITY = 'city',
    LOCKER = 'locker',
    CONSENT_TERMS_AND_PRIVACY = 'consentTap',
    CONSENT_INFO_CLAUSE = 'consentInfc',
    CONSENT_SCHOOL_VERIFICATION = 'consentSchv',
    CONSENT_CARETAKER = 'consentCrtr'
}

export type FormModel = {
    [FormField.PERSON_TYPE]: ReceiverPersonType;
    [FormField.SCHOOL]: string;
    [FormField.SCHOOL_GRADE]: string;
    [FormField.FIRST_NAME]: string;
    [FormField.LAST_NAME]: string;
    [FormField.CARETAKER_FIRST_NAME]: string;
    [FormField.CARETAKER_LAST_NAME]: string;
    [FormField.EMAIL]: string;
    [FormField.PHONE]: string;
    [FormField.STREET]: string;
    [FormField.STREET_NUMBER]: string;
    [FormField.POSTCODE]: string;
    [FormField.CITY]: string;
    [FormField.LOCKER]: Locker;
    [FormField.CONSENT_TERMS_AND_PRIVACY]: boolean;
    [FormField.CONSENT_INFO_CLAUSE]: boolean;
    [FormField.CONSENT_SCHOOL_VERIFICATION]: boolean;
    [FormField.CONSENT_CARETAKER]: boolean;
}

export type FormList<T> = {
    [k in FormField]: T;
}

export type ValidationResult = Partial<FormList<string | boolean>>;

export function create<T> (value: T): Partial<FormList<T>> {
    return Object.values(FormField).reduce((list, current) => {
        list[current] = value;

        return list;
    }, {});
}

export function emptyModel (base: Partial<FormModel> = {}): FormModel {
    return Object.assign({
        [FormField.PERSON_TYPE]: ReceiverPersonType.STUDENT,
        [FormField.SCHOOL]: '',
        [FormField.SCHOOL_GRADE]: '',
        [FormField.FIRST_NAME]: '',
        [FormField.LAST_NAME]: '',
        [FormField.CARETAKER_FIRST_NAME]: '',
        [FormField.CARETAKER_LAST_NAME]: '',
        [FormField.EMAIL]: '',
        [FormField.PHONE]: '',
        [FormField.STREET]: '',
        [FormField.STREET_NUMBER]: '',
        [FormField.POSTCODE]: '',
        [FormField.CITY]: '',
        [FormField.LOCKER]: null,
        [FormField.CONSENT_TERMS_AND_PRIVACY]: false,
        [FormField.CONSENT_INFO_CLAUSE]: false,
        [FormField.CONSENT_SCHOOL_VERIFICATION]: false,
        [FormField.CONSENT_CARETAKER]: false
    }, base);
}

export function getValidators (field: FormField): Validator[] {
    switch (field) {
        case FormField.PERSON_TYPE: return [
            isRequired()
        ];
        case FormField.SCHOOL: return [
            isRequired()
        ];
        case FormField.SCHOOL_GRADE: return [
            isRequiredIf((form: FormModel) => form[FormField.PERSON_TYPE] === ReceiverPersonType.STUDENT),
            everyIf([
                matchesRegex(/^[0-9]([a-z]|)$/, (value: string) => sanitizeField(FormField.SCHOOL_GRADE, value), 'Niepoprawny format klasy.')
            ], (form: FormModel) => form[FormField.PERSON_TYPE] === ReceiverPersonType.STUDENT)
        ];
        case FormField.FIRST_NAME: return [
            isRequired()
        ];
        case FormField.LAST_NAME: return [
            isRequired()
        ];
        case FormField.CARETAKER_FIRST_NAME: return [
            isRequiredIf((form: FormModel) => form[FormField.PERSON_TYPE] === ReceiverPersonType.STUDENT)
        ];
        case FormField.CARETAKER_LAST_NAME: return [
            isRequiredIf((form: FormModel) => form[FormField.PERSON_TYPE] === ReceiverPersonType.STUDENT)
        ];
        case FormField.EMAIL: return [
            isRequired(),
            isValidEmail((value: string) => value.trim())
        ];
        case FormField.PHONE: return [
            isRequired(),
            matchesRegex(/^(\+[0-9]{2}|)[0-9]{9}$/, (value: string) => sanitizeField(FormField.PHONE, value), 'Nieprawny format telefonu.')
        ];
        case FormField.STREET: return [
            isRequired()
        ];
        case FormField.STREET_NUMBER: return [
            isRequired()
        ];
        case FormField.POSTCODE: return [
            isRequired(),
            matchesRegex(/^[0-9]{2}-[0-9]{3}$/, (value: string) => sanitizeField(FormField.POSTCODE, value), 'Niepoprawny format kodu pocztowego.')
        ];
        case FormField.CITY: return [
            isRequired()
        ];
        case FormField.LOCKER: return [
            isRequired()
        ];
        case FormField.CONSENT_TERMS_AND_PRIVACY: return [
            isRequired()
        ];
        case FormField.CONSENT_INFO_CLAUSE: return [
            isRequired()
        ];
        case FormField.CONSENT_SCHOOL_VERIFICATION: return [
            isRequired()
        ];
        case FormField.CONSENT_CARETAKER: return [
            isRequiredIf((form: FormModel) => form[FormField.PERSON_TYPE] === ReceiverPersonType.STUDENT)
        ];
        default: return [];
    }
}

export function validateForm (form: FormModel): ValidationResult {
    return Object.values(FormField).map((field) => {
        const value = form[field];

        return validateField(field, value, { form });
    }).reduce((all, current) => {
        return Object.assign(all, current);
    }, {});
}

export function validateField (field: FormField, value: any, options: any): ValidationResult {
    const validators = getValidators(field);
    const results = validators.map((v) => v(value, options));
    const error = results.find((r) => !!r) || false;

    return { [field]: error };
}

export function sanitizeField (field: FormField, value: any) {
    switch (field) {
        case FormField.SCHOOL_GRADE: return romanStringToArabic(value).toLocaleLowerCase().replace(/ /g, '');
        case FormField.FIRST_NAME: return value.trim();
        case FormField.LAST_NAME: return value.trim();
        case FormField.CARETAKER_FIRST_NAME: return value.trim();
        case FormField.CARETAKER_LAST_NAME: return value.trim();
        case FormField.EMAIL: return value.trim();
        case FormField.PHONE: return sanitizePhoneNumber(value);
        case FormField.STREET: return value.trim();
        case FormField.STREET_NUMBER: return value.trim();
        case FormField.POSTCODE: return value.replace(/ /g, '');
        case FormField.CITY: return value.trim();
        case FormField.LOCKER: return value ? value.id : '';
        case FormField.CONSENT_TERMS_AND_PRIVACY: return Math.ceil(Date.now() / 1000);
        case FormField.CONSENT_INFO_CLAUSE: return Math.ceil(Date.now() / 1000);
        case FormField.CONSENT_SCHOOL_VERIFICATION: return Math.ceil(Date.now() / 1000);
        case FormField.CONSENT_CARETAKER: return Math.ceil(Date.now() / 1000);
        default: return value;
    }
}

export function sanitize (form: FormModel): Receiver {
    const receiver: Receiver = Object.keys(form).map((k) => {
        return [ k, sanitizeField(k as FormField, form[k])];
    }).reduce((total, current) => {
        total[current[0]] = current[1];

        return total;
    }, {} as Receiver);

    if (receiver[FormField.PERSON_TYPE] !== ReceiverPersonType.STUDENT) {
        delete receiver[FormField.SCHOOL_GRADE];
        delete receiver[FormField.CARETAKER_FIRST_NAME];
        delete receiver[FormField.CARETAKER_LAST_NAME];
        delete receiver[FormField.CONSENT_CARETAKER];
    }

    return receiver;
}

export function desanitize (receiver: Receiver, lockers: StateLockers): FormModel {
    const locker = lockers.find((l) => l.id === receiver.locker);

    return {
        ...receiver,
        locker,
        [FormField.CONSENT_TERMS_AND_PRIVACY]: !!receiver[FormField.CONSENT_TERMS_AND_PRIVACY],
        [FormField.CONSENT_INFO_CLAUSE]: !!receiver[FormField.CONSENT_INFO_CLAUSE],
        [FormField.CONSENT_SCHOOL_VERIFICATION]: !!receiver[FormField.CONSENT_SCHOOL_VERIFICATION],
        [FormField.CONSENT_CARETAKER]: !!receiver[FormField.CONSENT_CARETAKER]
    };
}

function sanitizePhoneNumber (raw: string): string {
    raw = raw.trim();
    if (raw.startsWith('00')) raw = raw.replace(/^00/g, '+');
    if (!raw.startsWith('+')) raw = '48' + raw;

    return '+' + raw.replace(/\D+/g, '');
}

function deromanize (roman: string): number {
    const map = [
        [ 'I', 1 ],
        [ 'V', 5 ],
        [ 'X', 10 ],
        [ 'L', 50 ],
        [ 'C', 100 ],
        [ 'D', 500 ],
        [ 'M', 1000 ]
    ];

    let arabic = 0;

    for (let i = 0; i < roman.split('').length; ++i) {
        const symbol = roman[i];
        const position = map.findIndex((i) => i[0] === symbol);

        if (position === -1) continue;

        const next = roman.split('')[i + 1];
        const nextPosition = map.findIndex((i) => i[0] === next);
        const substract = nextPosition !== -1 ? nextPosition > position : false;
        const value = map[position][1] as number;

        if (substract) arabic -= value;
        else arabic += value;
    }

    return arabic;
}

function romanStringToArabic (text: string): string {
    const found = text.match(/(I|V|X|L|C|D|M)+/g) || [];

    found.forEach((f) => {
        text = text.replace(f, `${deromanize(f)}`);
    });

    return text;
}
