/* Models */
import { Locker } from 'common/model/Locker';
import { Receiver } from 'common/model/Receiver';

/* Application files */
import { Validator, isRequired } from 'client/lib/validators';

export enum FormField {
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    EMAIL = 'email',
    PHONE = 'phone',
    STREET = 'street',
    STREET_NUMBER = 'streetNumber',
    CITY = 'city',
    POSTCODE = 'postcode',
    LOCKER = 'locker'
}

export type FormModel = {
    [FormField.FIRST_NAME]: string;
    [FormField.LAST_NAME]: string;
    [FormField.EMAIL]: string;
    [FormField.PHONE]: string;
    [FormField.STREET]: string;
    [FormField.STREET_NUMBER]: string;
    [FormField.CITY]: string;
    [FormField.POSTCODE]: string;
    [FormField.LOCKER]: Locker;
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
        [FormField.FIRST_NAME]: '',
        [FormField.LAST_NAME]: '',
        [FormField.EMAIL]: '',
        [FormField.PHONE]: '',
        [FormField.STREET]: '',
        [FormField.STREET_NUMBER]: '',
        [FormField.CITY]: '',
        [FormField.POSTCODE]: '',
        [FormField.LOCKER]: null
    }, base);
}

export function getValidators (field: FormField): Validator[] {
    switch (field) {
        case FormField.FIRST_NAME: return [ isRequired() ];
        case FormField.LAST_NAME: return [ isRequired() ];
        case FormField.EMAIL: return [ isRequired() ];
        case FormField.PHONE: return [ isRequired() ];
        case FormField.STREET: return [ isRequired() ];
        case FormField.STREET_NUMBER: return [ isRequired() ];
        case FormField.CITY: return [ isRequired() ];
        case FormField.POSTCODE: return [ isRequired() ];
        case FormField.LOCKER: return [ isRequired() ];
        default: return [];
    }
}

export function validateForm (form: FormModel): ValidationResult {
    return Object.values(FormField).map((field) => {
        const value = form[field];

        return validateField(field, value);
    }).reduce((all, current) => {
        return Object.assign(all, current);
    }, {});
}

export function validateField (field: FormField, value: any): ValidationResult {
    const validators = getValidators(field);
    const results = validators.map((v) => v(value));
    const error = results.find((r) => !!r) || false;

    return { [field]: error };
}

export function sanitize (form: FormModel): Receiver {
    return {
        ...form,
        locker: form.locker ? form.locker.id : '',
        phone: sanitizePhoneNumber(form.phone),
        complete: false
    };
}

function sanitizePhoneNumber (raw: string): string {
    if (raw.startsWith('00')) raw = raw.replace(/^00/g, '+');
    if (!raw.startsWith('+')) raw = '48' + raw;

    return '+' + raw.replace(/\D+/g, '');
}
