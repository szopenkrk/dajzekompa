/* Models */
import { Locker } from 'common/model/Locker';
import { Receiver, ReceiverPersonType } from 'common/model/Receiver';
import { StateLockers } from 'client/model/Redux';

/* Application files */
import { Validator, isRequired, isRequiredIf } from 'client/lib/validators';

export enum FormField {
    PERSON_TYPE = 'personType',
    FIRST_NAME = 'firstName',
    CARETAKER_FIRST_NAME = 'caretakerFirstName',
    CARETAKER_LAST_NAME = 'caretakerLastName',
    LAST_NAME = 'lastName',
    EMAIL = 'email',
    PHONE = 'phone',
    STREET = 'street',
    STREET_NUMBER = 'streetNumber',
    CITY = 'city',
    POSTCODE = 'postcode',
    LOCKER = 'locker',
    SCHOOL = 'school',
    SCHOOL_GRADE = 'grade',
    CONSENT_TERMS_AND_PRIVACY = 'consentTap',
    CONSENT_INFO_CLAUSE = 'consentInfc',
    CONSENT_SCHOOL_VERIFICATION = 'consentSchv',
    CONSENT_CARETAKER = 'consentCrtr'
}

export type FormModel = {
    [FormField.PERSON_TYPE]: ReceiverPersonType;
    [FormField.FIRST_NAME]: string;
    [FormField.LAST_NAME]: string;
    [FormField.CARETAKER_FIRST_NAME]: string;
    [FormField.CARETAKER_LAST_NAME]: string;
    [FormField.EMAIL]: string;
    [FormField.PHONE]: string;
    [FormField.STREET]: string;
    [FormField.STREET_NUMBER]: string;
    [FormField.CITY]: string;
    [FormField.POSTCODE]: string;
    [FormField.LOCKER]: Locker;
    [FormField.SCHOOL]: string;
    [FormField.SCHOOL_GRADE]: string;
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
        [FormField.FIRST_NAME]: '',
        [FormField.LAST_NAME]: '',
        [FormField.CARETAKER_FIRST_NAME]: '',
        [FormField.CARETAKER_LAST_NAME]: '',
        [FormField.EMAIL]: '',
        [FormField.PHONE]: '',
        [FormField.STREET]: '',
        [FormField.STREET_NUMBER]: '',
        [FormField.CITY]: '',
        [FormField.POSTCODE]: '',
        [FormField.LOCKER]: null,
        [FormField.SCHOOL]: '',
        [FormField.SCHOOL_GRADE]: '',
        [FormField.CONSENT_TERMS_AND_PRIVACY]: false,
        [FormField.CONSENT_INFO_CLAUSE]: false,
        [FormField.CONSENT_SCHOOL_VERIFICATION]: false,
        [FormField.CONSENT_CARETAKER]: false
    }, base);
}

export function getValidators (field: FormField): Validator[] {
    switch (field) {
        case FormField.PERSON_TYPE: return [ isRequired() ];
        case FormField.FIRST_NAME: return [ isRequired() ];
        case FormField.LAST_NAME: return [ isRequired() ];
        case FormField.CARETAKER_FIRST_NAME: return [ isRequiredIf((form: FormModel) => form[FormField.PERSON_TYPE] === ReceiverPersonType.STUDENT) ];
        case FormField.CARETAKER_LAST_NAME: return [ isRequiredIf((form: FormModel) => form[FormField.PERSON_TYPE] === ReceiverPersonType.STUDENT) ];
        case FormField.EMAIL: return [ isRequired() ];
        case FormField.PHONE: return [ isRequired() ];
        case FormField.STREET: return [ isRequired() ];
        case FormField.STREET_NUMBER: return [ isRequired() ];
        case FormField.CITY: return [ isRequired() ];
        case FormField.POSTCODE: return [ isRequired() ];
        case FormField.LOCKER: return [ isRequired() ];
        case FormField.SCHOOL: return [ isRequired() ];
        case FormField.SCHOOL_GRADE: return [ isRequiredIf((form: FormModel) => form[FormField.PERSON_TYPE] === ReceiverPersonType.STUDENT) ];
        case FormField.CONSENT_TERMS_AND_PRIVACY: return [ isRequired() ];
        case FormField.CONSENT_INFO_CLAUSE: return [ isRequired() ];
        case FormField.CONSENT_SCHOOL_VERIFICATION: return [ isRequired() ];
        case FormField.CONSENT_CARETAKER: return [ isRequiredIf((form: FormModel) => form[FormField.PERSON_TYPE] === ReceiverPersonType.STUDENT) ];
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

export function sanitize (form: FormModel): Receiver {
    const now = Math.ceil(Date.now() / 1000);

    const receiver: Receiver = {
        ...form,
        [FormField.LOCKER]: form[FormField.LOCKER] ? form[FormField.LOCKER].id : '',
        [FormField.FIRST_NAME]: form[FormField.FIRST_NAME].trim(),
        [FormField.LAST_NAME]: form[FormField.LAST_NAME].trim(),
        [FormField.CARETAKER_FIRST_NAME]: form[FormField.CARETAKER_FIRST_NAME].trim(),
        [FormField.CARETAKER_LAST_NAME]: form[FormField.CARETAKER_LAST_NAME].trim(),
        [FormField.EMAIL]: form[FormField.EMAIL].trim(),
        [FormField.STREET]: form[FormField.STREET].trim(),
        [FormField.STREET_NUMBER]: form[FormField.STREET_NUMBER].trim(),
        [FormField.POSTCODE]: form[FormField.POSTCODE].trim(),
        [FormField.CITY]: form[FormField.CITY].trim(),
        [FormField.SCHOOL_GRADE]: form[FormField.SCHOOL_GRADE].trim(),
        [FormField.PHONE]: sanitizePhoneNumber(form[FormField.PHONE]),
        [FormField.CONSENT_TERMS_AND_PRIVACY]: now,
        [FormField.CONSENT_INFO_CLAUSE]: now,
        [FormField.CONSENT_SCHOOL_VERIFICATION]: now,
        [FormField.CONSENT_CARETAKER]: now
    };

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
