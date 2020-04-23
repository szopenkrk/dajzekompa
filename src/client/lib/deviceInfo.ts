/* Models */
import { DeviceInput, DeviceInputType } from 'common/model/Device';

/* Application files */
import { Validator, isRequired, matchesRegex } from 'client/lib/validators';

export type FormList<T> = {
    [k in string]: T;
}

export type ValidationResult = Partial<FormList<string | boolean>>;

export function create<T> (inputs: DeviceInput[], value): Partial<FormList<T>> {
    return inputs.reduce((list, current) => {
        list[current.id] = value;

        return list;
    }, {});
}

export function empty(inputs: DeviceInput[]) {
    return inputs.map((input) => ({
        id: input.id,
        ...(isSelectable(input.type) ? {} : { value: '' }),
        ...(isSelectable(input.type) ? { option: input.options[0].id } : { })
    }));
}

export function getValidators (field: string): Validator[] {
    switch (field) {
        case 'cpu': return [
            isRequired(),
            matchesRegex(/^[0-9]+(\.[0-9]{1,2}|)$/, (value: string) => `${sanitizeField('cpu', value)}`, 'Niepoprawna liczba.')
        ];
        case 'ram': return [
            isRequired(),
            matchesRegex(/^[0-9]+(\.[0-9]{1,2}|)$/, (value: string) => `${sanitizeField('ram', value)}`, 'Niepoprawna liczba.')
        ];
        case 'hdd': return [
            isRequired(),
            matchesRegex(/^[0-9]+(\.[0-9]{1,2}|)$/, (value: string) => `${sanitizeField('hdd', value)}`, 'Niepoprawna liczba.')
        ];
        case 'screen_size': return [
            isRequired(),
            matchesRegex(/^[0-9]+(\.[0-9]{1}|)$/, (value: string) => `${sanitizeField('screen_size', value)}`, 'Niepoprawna liczba.')
        ];
        default: return [];
    }
}

export function sanitizeField (field: string, value: any) {
    switch (field) {
        case 'notebook_name': return value.trim();
        case 'cpu': return parseFloat(value.trim().replace(/,/g, '.'));
        case 'ram': return parseFloat(value.trim().replace(/,/g, '.'));
        case 'hdd': return parseFloat(value.trim().replace(/,/g, '.'));
        case 'screen_size': return parseFloat(value.trim().replace(/,/g, '.'));
        default: return value;
    }
}

export function validateField (field: string, value: any, options: any): ValidationResult {
    const validators = getValidators(field);
    const results = validators.map((v) => v(value, options));
    const error = results.find((r) => !!r) || false;

    return { [field]: error };
}

export function isSelectable (type: DeviceInputType): boolean {
    if (type === DeviceInputType.TEXT) return false;

    return true;
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
        case 'cpu_type': return 'Producent procesora';
        default: return input;
    }
}
