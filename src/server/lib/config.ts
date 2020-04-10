import { LogLevel } from 'server/model/Log';

function getMostRelevantConfigProp (prop: string) {
    if (typeof process.env[prop] !== 'undefined') {
        return process.env[prop];
    }

    return null;
}

function getConfigString (prop: string): string {
    prop = getMostRelevantConfigProp(prop);

    return prop ? `${prop}` : null;
}

function getConfigNumber (prop: string): number {
    prop = getMostRelevantConfigProp(prop);

    return prop ? ~~`${prop}` : null;
}

function getConfigBoolean (prop: string): boolean {
    prop = getMostRelevantConfigProp(prop);

    return prop ? prop === 'true' : null;
}

function getConfigAuth (prop: string): string[] {
    prop = getMostRelevantConfigProp(prop);

    return prop ? Buffer.from(prop, 'base64').toString().split(':') : null;
}

function getConfig (prop: string, type: string): any {
    switch (type) {
        case 'string': return getConfigString(prop);
        case 'number': return getConfigNumber(prop);
        case 'boolean': return getConfigBoolean(prop);
        case 'auth': return getConfigAuth(prop);
        default: return getConfigString(prop);
    }
}

export default class Config {
    public static __CLIENT_ENABLED__: string[] = [ 'NODE_ENV', 'MAINTENANCE_MODE', 'API_URL', 'CONTACT_EMAIL' ];

    /* System level */
    public static APP_NAME: string = getConfig('APP_NAME', 'string');
    public static NODE_ENV: string = getConfig('NODE_ENV', 'string');
    public static PORT: number = getConfig('PORT', 'number');
    public static STRICT_TLS: boolean = getConfig('STRICT_TLS', 'boolean');
    public static LOG_LEVEL: LogLevel = getConfig('LOG_LEVEL', 'string') as LogLevel;

    /* Custom */
    public static MAINTENANCE_MODE: boolean = getConfig('MAINTENANCE_MODE', 'boolean');
    public static DB_URL: string = getConfig('DB_URL', 'string');
    public static API_URL: string = getConfig('API_URL', 'string');
    public static AWS_ACCESS_KEY_ID: string = getConfig('AWS_ACCESS_KEY_ID', 'string');
    public static AWS_SECRET_ACCESS_KEY: string = getConfig('AWS_SECRET_ACCESS_KEY', 'string');
    public static AWS_S3_BUCKET_NAME: string = getConfig('AWS_S3_BUCKET_NAME', 'string');
    public static CONTACT_EMAIL: string = getConfig('CONTACT_EMAIL', 'string');
}
