export type Validator = (value: any) => string | boolean;

export function isRequired (error: string = 'To pole jest wymagane.') {
    return (value: string): string | boolean => {
        return !value ? error : false;
    };
}
