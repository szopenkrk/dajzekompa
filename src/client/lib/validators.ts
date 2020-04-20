const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export type Validator = (value: any, options?: any) => string | boolean;

export type Preformat = (value: any) => any;

export function isRequired (error: string = 'To pole jest wymagane.'): Validator {
    return (value: string): string | boolean => {
        if (typeof value === 'string') value = value.trim();

        return !value ? error : false;
    };
}

export function isRequiredIf (dependency: (form: any) => boolean, error: string = 'To pole jest wymagane.'): Validator {
    return (value: string, options: any) => {
        if (!dependency(options.form)) return false;
        if (typeof value === 'string') value = value.trim();

        return isRequired(error)(value);
    };
}

export function isValidEmail (preformat?: Preformat, error: string = 'Niepoprawny adres e-mail.'): Validator {
    return (value: string): string | boolean => {
        return !regexEmail.test((preformat ? preformat(value) : value).toLocaleLowerCase()) ? error : false;
    };
}

export function isMinimumLengthOf (length: number, preformat?: Preformat, error: string = 'To pole jest za krótkie.'): Validator {
    return (value: string): string | boolean => {
        return (preformat ? preformat(value) : value).length < length ? error: false;
    };
}

export function isMaximumLengthOf (length: number, preformat?: Preformat, error: string = 'To pole jest za długie.'): Validator {
    return (value: string): string | boolean => {
        return (preformat ? preformat(value) : value).length > length ? error: false;
    };
}

export function isExactLengthOf (length: number, preformat?: Preformat, error: string = 'To pole jest za krótkie.'): Validator {
    return (value: string): string | boolean => {
        return (preformat ? preformat(value) : value).length !== length ? error: false;
    };
}

export function matchesRegex (regex: RegExp, preformat?: Preformat, error: string = 'Niepoprawny format pola.'): Validator {
    return (value: string): string | boolean => {
        return !regex.test(preformat ? preformat(value) : value) ? error : false;
    };
}

export function any (validators: Validator[]): Validator {
    return (value: string, options: any): string | boolean => {
        const correct = validators.some((v) => v(value, options) === false);

        return correct ? false : validators.find((v) => v(value, options) !== false)(value, options);
    };
}

export function anyIf (validators: Validator[], dependency: (form: any) => boolean) {
    return (value: string, options: any): string | boolean => {
        if (!dependency(options.form)) return false;

        return any(validators)(value, options);
    };
}

export function every (validators: Validator[]): Validator {
    return (value: string, options: any): string | boolean => {
        const correct = validators.every((v) => v(value, options) === false);

        return correct ? false : validators.find((v) => v(value, options) !== false)(value, options);
    };
}

export function everyIf (validators: Validator[], dependency: (form: any) => boolean) {
    return (value: string, options: any): string | boolean => {
        if (!dependency(options.form)) return false;

        return any(validators)(value, options);
    };
}
