export type Validator = (value: any, options?: any) => string | boolean;

export function isRequired (error: string = 'To pole jest wymagane.') {
    return (value: string): string | boolean => {
        return !value ? error : false;
    };
}

export function isRequiredIf (dependency: (form: any) => boolean, error: string = 'To pole jest wymagane.') {
    return (value: string, options: any) => {
        if (!dependency(options.form)) return false;

        return isRequired(error)(value);
    };
}
