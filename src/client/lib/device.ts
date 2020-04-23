/* Libraries */
import { green, lightGreen, lime, amber, orange, deepOrange, grey } from '@material-ui/core/colors';

/* Models */
import { Device, DevicePersonType, DeviceStatus, DeviceType, DeviceUpsertRequest, DeviceInputRequest } from 'common/model/Device';

/* Application files */
import { Validator, isRequired, isRequiredIf, matchesRegex, isValidEmail, everyIf } from 'client/lib/validators';

export enum FormField {
    DEVICE_TYPE = 'deviceType',
    PERSON_TYPE = 'personType',
    COMPANY_NAME = 'companyName',
    NIP = 'nip',
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    EMAIL = 'email',
    STREET = 'street',
    STREET_NUMBER = 'streetNumber',
    CITY = 'city',
    POSTCODE = 'postcode',
    BANK_ACCOUNT = 'bankAccount',
    PHOTOS = 'photos',
    INPUTS = 'inputs',
    COMMENTS = 'comments',
    CONSENT_TERMS_AND_PRIVACY = 'consentTap',
    CONSENT_INFO_CLAUSE = 'consentInfc',
    CONSENT_DATA_CLEANED = 'consentDtcl',
    CONSENT_PUBLIC_LIST = 'consentPbl'
}

export type FormModel = {
    [FormField.PERSON_TYPE]: DevicePersonType;
    [FormField.COMPANY_NAME]: string;
    [FormField.NIP]: string;
    [FormField.FIRST_NAME]: string;
    [FormField.LAST_NAME]: string;
    [FormField.EMAIL]: string;
    [FormField.STREET]: string;
    [FormField.STREET_NUMBER]: string;
    [FormField.CITY]: string;
    [FormField.POSTCODE]: string;
    [FormField.BANK_ACCOUNT]: string;
    [FormField.DEVICE_TYPE]: DeviceType;
    [FormField.PHOTOS]: string[];
    [FormField.INPUTS]: DeviceInputRequest[];
    [FormField.COMMENTS]: string;
    [FormField.CONSENT_TERMS_AND_PRIVACY]: boolean;
    [FormField.CONSENT_INFO_CLAUSE]: boolean;
    [FormField.CONSENT_DATA_CLEANED]: boolean;
    [FormField.CONSENT_PUBLIC_LIST]: boolean;
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

export function empty (base: Partial<FormModel> = {}): FormModel {
    return Object.assign({
        [FormField.PERSON_TYPE]: DevicePersonType.PERSON,
        [FormField.COMPANY_NAME]: '',
        [FormField.NIP]: '',
        [FormField.FIRST_NAME]: '',
        [FormField.LAST_NAME]: '',
        [FormField.EMAIL]: '',
        [FormField.STREET]: '',
        [FormField.STREET_NUMBER]: '',
        [FormField.CITY]: '',
        [FormField.POSTCODE]: '',
        [FormField.BANK_ACCOUNT]: '',
        [FormField.DEVICE_TYPE]: null,
        [FormField.PHOTOS]: [],
        [FormField.INPUTS]: [],
        [FormField.COMMENTS]: '',
        [FormField.CONSENT_TERMS_AND_PRIVACY]: false,
        [FormField.CONSENT_INFO_CLAUSE]: false,
        [FormField.CONSENT_DATA_CLEANED]: false,
        [FormField.CONSENT_PUBLIC_LIST]: false
    }, base);
}

export function getValidators (field: FormField): Validator[] {
    switch (field) {
        case FormField.PERSON_TYPE: return [
            isRequired()
        ];
        case FormField.COMPANY_NAME: return [
            isRequiredIf((form: FormModel) => form[FormField.PERSON_TYPE] === DevicePersonType.COMPANY)
        ];
        case FormField.NIP: return [
            isRequiredIf((form: FormModel) => form[FormField.PERSON_TYPE] === DevicePersonType.COMPANY),
            everyIf([
                matchesRegex(/^[0-9]{10}$/, (value: string) => sanitizeField(FormField.NIP, value), 'Numer NIP jest niepoprawny.')
            ], (form: FormModel) => form[FormField.PERSON_TYPE] === DevicePersonType.COMPANY)
        ];
        case FormField.FIRST_NAME: return [
            isRequired()
        ];
        case FormField.LAST_NAME: return [
            isRequired()
        ];
        case FormField.EMAIL: return [
            isRequired(),
            isValidEmail((value: string) => value.trim())
        ];
        case FormField.STREET: return [
            isRequired()
        ];
        case FormField.STREET_NUMBER: return [
            isRequired()
        ];
        case FormField.CITY: return [
            isRequired()
        ];
        case FormField.POSTCODE: return [
            isRequired(),
            matchesRegex(/^[0-9]{2}-[0-9]{3}$/, (value: string) => sanitizeField(FormField.POSTCODE, value), 'Niepoprawny format kodu pocztowego.')
        ];
        case FormField.BANK_ACCOUNT: return [
            isRequired(),
            matchesRegex(/^[0-9]{26}$/, (value: string) => sanitizeField(FormField.BANK_ACCOUNT, value), 'Numer konta jest niepoprawny.')
        ];
        case FormField.DEVICE_TYPE: return [
            isRequired()
        ];
        case FormField.CONSENT_TERMS_AND_PRIVACY: return [
            isRequired()
        ];
        case FormField.CONSENT_INFO_CLAUSE: return [
            isRequired()
        ];
        case FormField.CONSENT_DATA_CLEANED: return [
            isRequired()
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
        case FormField.DEVICE_TYPE: return value.id;
        case FormField.FIRST_NAME: return value.trim();
        case FormField.LAST_NAME: return value.trim();
        case FormField.COMPANY_NAME: return value.trim();
        case FormField.NIP: return value.trim().replace(/\D+/g, '');
        case FormField.EMAIL: return value.trim();
        case FormField.STREET: return value.trim();
        case FormField.STREET_NUMBER: return value.trim();
        case FormField.POSTCODE: return value.replace(/ /g, '');
        case FormField.CITY: return value.trim();
        case FormField.BANK_ACCOUNT: return value.trim().replace(/ /g, '');
        case FormField.CONSENT_TERMS_AND_PRIVACY: return Math.ceil(Date.now() / 1000);
        case FormField.CONSENT_INFO_CLAUSE: return Math.ceil(Date.now() / 1000);
        case FormField.CONSENT_DATA_CLEANED: return Math.ceil(Date.now() / 1000);
        case FormField.CONSENT_PUBLIC_LIST: return value ? Math.ceil(Date.now() / 1000) : null;
        default: return value;
    }
}

export function sanitize (form: FormModel): DeviceUpsertRequest {
    return {
        ...form,
        type: sanitizeField(FormField.DEVICE_TYPE, form.deviceType),
        firstName: sanitizeField(FormField.FIRST_NAME, form.firstName),
        lastName: sanitizeField(FormField.LAST_NAME, form.lastName),
        companyName: sanitizeField(FormField.COMPANY_NAME, form.companyName),
        email: sanitizeField(FormField.EMAIL, form.email),
        street: sanitizeField(FormField.STREET, form.street),
        streetNumber: sanitizeField(FormField.STREET_NUMBER, form.streetNumber),
        postcode: sanitizeField(FormField.POSTCODE, form.postcode),
        city: sanitizeField(FormField.CITY, form.city),
        bankAccount: sanitizeField(FormField.BANK_ACCOUNT, form.bankAccount),
        consentTap: sanitizeField(FormField.CONSENT_TERMS_AND_PRIVACY, form.bankAccount),
        consentInfc: sanitizeField(FormField.CONSENT_INFO_CLAUSE, form.bankAccount),
        consentDtcl: sanitizeField(FormField.CONSENT_DATA_CLEANED, form.bankAccount),
        consentPbl: sanitizeField(FormField.CONSENT_PUBLIC_LIST, form.bankAccount)
    };

    // if (device[FormField.PERSON_TYPE] === DevicePersonType.PERSON) {
    //     delete device[FormField.COMPANY_NAME];
    //     delete device[FormField.NIP];
    // }

    // return Object.keys(device).reduce((all, current) => {
    //     if (typeof device[current] === 'undefined' || device[current] === '' || device[current] === null) return all;

    //     all[current] = device[current];

    //     return all;
    // }, {} as Device);
}

export function desanitize (device: Device, deviceTypes: DeviceType[]): FormModel {
    const deviceType = deviceTypes.find((l) => l.id === device.type.id);

    return {
        ...device,
        [FormField.DEVICE_TYPE]: deviceType,
        [FormField.CONSENT_TERMS_AND_PRIVACY]: !!device[FormField.CONSENT_TERMS_AND_PRIVACY],
        [FormField.CONSENT_INFO_CLAUSE]: !!device[FormField.CONSENT_INFO_CLAUSE],
        [FormField.CONSENT_DATA_CLEANED]: !!device[FormField.CONSENT_DATA_CLEANED],
        [FormField.CONSENT_PUBLIC_LIST]: !!device[FormField.CONSENT_PUBLIC_LIST],
        [FormField.COMPANY_NAME]: device[FormField.COMPANY_NAME] || '',
        [FormField.NIP]: device[FormField.NIP] || '',
        [FormField.INPUTS]: device[FormField.INPUTS].map((i) => ({
            id: i.id
        }))
    };
}

export function getDeviceStatusColor (type: DeviceStatus): string {
    switch (type) {
        case DeviceStatus.RECEIVED: return deepOrange[700];
        case DeviceStatus.SENT_TO_SERVICE: return orange[700];
        case DeviceStatus.IN_SERVICE: return amber[700];
        case DeviceStatus.SERVICE_COMPLETE: return lime[700];
        case DeviceStatus.SENT_TO_RECIPIENT: return lightGreen[700];
        case DeviceStatus.COMPLETE: return green[700];
        default: return grey[700];
    }
}

export function getDeviceStatusText (status: DeviceStatus): string {
    switch (status) {
        case DeviceStatus.RECEIVED: return 'U darczyńcy';
        case DeviceStatus.SENT_TO_SERVICE: return 'Wysłano do serwisu';
        case DeviceStatus.IN_SERVICE: return 'W serwisie';
        case DeviceStatus.SERVICE_COMPLETE: return 'Serwis zakończony';
        case DeviceStatus.SENT_TO_RECIPIENT: return 'Wysłano do odbiorcy';
        case DeviceStatus.COMPLETE: return 'U odbiorcy';
        default: return 'Nieznany';
    }
}

export function base64toBlob (base64: string): Blob {
    const type = base64.split(',')[0].split(':')[1].split(';')[0];
    const bytes = atob(base64.split(',')[1]);
    const binary = new Uint8Array(bytes.length);

    for (let i = 0; i < bytes.length; ++i) {
        binary[i] = bytes.charCodeAt(i);
    }

    return new Blob([binary], { type });
}
