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
    public static __CLIENT_ENABLED__: string[] = [ 'NODE_ENV', 'MAINTENANCE_MODE', 'API_URL', 'CONTACT_EMAIL', 'ADMIN_PANEL_ENABLED' ];

    /* System level */
    public static APP_NAME: string = getConfig('APP_NAME', 'string');
    public static NODE_ENV: string = getConfig('NODE_ENV', 'string');
    public static PORT: number = getConfig('PORT', 'number');
    public static STRICT_TLS: boolean = getConfig('STRICT_TLS', 'boolean');
    public static LOG_LEVEL: LogLevel = getConfig('LOG_LEVEL', 'string') as LogLevel;

    /* Custom */
    public static MAINTENANCE_MODE: boolean = getConfig('MAINTENANCE_MODE', 'boolean');
    public static DB_HOST: string = getConfig('DB_HOST', 'string');
    public static DB_PORT: number = getConfig('DB_PORT', 'number');
    public static DB_USER: string = getConfig('DB_USER', 'string');
    public static DB_PASSWORD: string = getConfig('DB_PASSWORD', 'string');
    public static DB_DATABASE: string = getConfig('DB_DATABASE', 'string');
    public static API_URL: string = getConfig('API_URL', 'string');
    public static CONTACT_EMAIL: string = getConfig('CONTACT_EMAIL', 'string');
    public static GOOGLE_APPLICATION_CREDENTIALS: string = getConfig('GOOGLE_APPLICATION_CREDENTIALS', 'string');
    public static GOOGLE_PROJECT_ID: string = getConfig('GOOGLE_PROJECT_ID', 'string');
    public static GOOGLE_STORAGE_BUCKET: string = getConfig('GOOGLE_STORAGE_BUCKET', 'string');
    public static TLS_KEY_FILE: string = getConfig('TLS_KEY_FILE', 'string');
    public static TLS_CERT_FILE: string = getConfig('TLS_CERT_FILE', 'string');
    public static ADMIN_PANEL_ENABLED: boolean = getConfig('ADMIN_PANEL_ENABLED', 'boolean');
    public static ADMIN_USER: string = getConfig('ADMIN_USER', 'string');
    public static ADMIN_PASSWORD: string = getConfig('ADMIN_PASSWORD', 'string');
}
