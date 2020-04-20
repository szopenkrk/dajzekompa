/* Libraries */
import { green, lightGreen, lime, amber, orange, deepOrange, grey } from '@material-ui/core/colors';

/* Models */
import { Device, DevicePersonType, DeviceStatus, DeviceType } from 'common/model/Device';

/* Application files */
import { Validator, isRequired, isRequiredIf, matchesRegex, isValidEmail, everyIf } from 'client/lib/validators';

export enum FormField {
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
    DEVICE_TYPE = 'deviceType',
    NOTEBOOK_NAME = 'notebookName',
    RAM = 'ram',
    HDD = 'hdd',
    SCREEN_SIZE = 'screenSize',
    MONITOR = 'monitor',
    CAMERA = 'camera',
    MICROPHONE = 'microphone',
    SPEAKERS = 'speakers',
    PHOTOS = 'photos',
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
    [FormField.NOTEBOOK_NAME]: string;
    [FormField.RAM]: string;
    [FormField.HDD]: string;
    [FormField.SCREEN_SIZE]: string;
    [FormField.MONITOR]: boolean;
    [FormField.CAMERA]: boolean;
    [FormField.MICROPHONE]: boolean;
    [FormField.SPEAKERS]: boolean;
    [FormField.PHOTOS]: string[];
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

export function emptyModel (base: Partial<FormModel> = {}): FormModel {
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
        [FormField.NOTEBOOK_NAME]: '',
        [FormField.RAM]: '',
        [FormField.HDD]: '',
        [FormField.SCREEN_SIZE]: '',
        [FormField.MONITOR]: false,
        [FormField.CAMERA]: false,
        [FormField.MICROPHONE]: false,
        [FormField.SPEAKERS]: false,
        [FormField.PHOTOS]: [],
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
        case FormField.RAM: return [
            isRequired(),
            matchesRegex(/^[0-9]+(\.[0-9]{1,2}|)$/, (value: string) => `${sanitizeField(FormField.RAM, value)}`, 'Niepoprawna liczba.')
        ];
        case FormField.HDD: return [
            isRequired(),
            matchesRegex(/^[0-9]+(\.[0-9]{1,2}|)$/, (value: string) => `${sanitizeField(FormField.HDD, value)}`, 'Niepoprawna liczba.')
        ];
        case FormField.SCREEN_SIZE: return [
            isRequired(),
            matchesRegex(/^[0-9]+(\.[0-9]{1}|)$/, (value: string) => `${sanitizeField(FormField.SCREEN_SIZE, value)}`, 'Niepoprawna liczba.')
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
        case FormField.NOTEBOOK_NAME: return value.trim();
        case FormField.RAM: return parseFloat(value.trim().replace(/,/g, '.'));
        case FormField.HDD: return parseFloat(value.trim().replace(/,/g, '.'));
        case FormField.SCREEN_SIZE: return parseFloat(value.trim().replace(/,/g, '.'));
        case FormField.CONSENT_TERMS_AND_PRIVACY: return Math.ceil(Date.now() / 1000);
        case FormField.CONSENT_INFO_CLAUSE: return Math.ceil(Date.now() / 1000);
        case FormField.CONSENT_DATA_CLEANED: return Math.ceil(Date.now() / 1000);
        case FormField.CONSENT_PUBLIC_LIST: return value ? Math.ceil(Date.now() / 1000) : null;
        default: return value;
    }
}

export function sanitize (form: FormModel): Device {
    const device = Object.keys(form).map((k) => {
        return [ k, sanitizeField(k as FormField, form[k])];
    }).reduce((total, current) => {
        total[current[0]] = current[1];

        return total;
    }, {} as Device);

    if (device[FormField.PERSON_TYPE] === DevicePersonType.PERSON) {
        delete device[FormField.COMPANY_NAME];
        delete device[FormField.NIP];
    }

    if (device[FormField.RAM] === 0) delete form[FormField.RAM];
    if (device[FormField.HDD] === 0) delete form[FormField.HDD];
    if (device[FormField.SCREEN_SIZE] === 0) delete form[FormField.SCREEN_SIZE];

    return Object.keys(device).reduce((all, current) => {
        if (typeof device[current] === 'undefined' || device[current] === '' || device[current] === null) return all;

        all[current] = device[current];

        return all;
    }, {} as Device);
}

export function desanitize (device: Device, deviceTypes: DeviceType[]): FormModel {
    const deviceType = deviceTypes.find((l) => l.id === device.deviceType);

    return {
        ...device,
        [FormField.DEVICE_TYPE]: deviceType,
        [FormField.CONSENT_TERMS_AND_PRIVACY]: !!device[FormField.CONSENT_TERMS_AND_PRIVACY],
        [FormField.CONSENT_INFO_CLAUSE]: !!device[FormField.CONSENT_INFO_CLAUSE],
        [FormField.CONSENT_DATA_CLEANED]: !!device[FormField.CONSENT_DATA_CLEANED],
        [FormField.CONSENT_PUBLIC_LIST]: !!device[FormField.CONSENT_PUBLIC_LIST],
        [FormField.COMPANY_NAME]: device[FormField.COMPANY_NAME] || '',
        [FormField.NIP]: device[FormField.NIP] || '',
        [FormField.NOTEBOOK_NAME]: device[FormField.NOTEBOOK_NAME] || '',
        [FormField.RAM]: `${device[FormField.RAM]}`,
        [FormField.HDD]: `${device[FormField.HDD]}`,
        [FormField.SCREEN_SIZE]: `${device[FormField.SCREEN_SIZE]}`,
        [FormField.MONITOR]: typeof device[FormField.MONITOR] !== 'undefined' ? device[FormField.MONITOR] : false,
        [FormField.CAMERA]: typeof device[FormField.CAMERA] !== 'undefined' ? device[FormField.CAMERA] : false,
        [FormField.MICROPHONE]: typeof device[FormField.MICROPHONE] !== 'undefined' ? device[FormField.MICROPHONE] : false,
        [FormField.SPEAKERS]: typeof device[FormField.SPEAKERS] !== 'undefined' ? device[FormField.SPEAKERS] : false,
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

export function getDeviceTypeLabel (option: string): string {
    switch (option) {
        case 'notebook': return 'Laptop';
        case 'desktop': return 'Komputer stacjonarny';
        case 'monitor': return 'Monitor';
        default: return option;
    }
}

export function getDeviceInputLabel (input: string): string {
    switch (input) {
        case 'notebook_name': return 'Producent i model';
        case 'cpu': return 'Taktowanie procesora (GHz)';
        case 'ram': return 'Pamięć RAM (GB)';
        case 'hdd': return 'Pojemność dysków (GB)';
        case 'screen_size': return 'Rozmiar ekranu (cale)';
        default: return input;
    }
}
