import { AnyObject } from 'common/model/Object';

export default class Config {
    public static NODE_ENV: string;
    public static MAINTENANCE_MODE: boolean;
    public static API_URL: string;
    public static APP_URL: string;
    public static CONTACT_EMAIL: string;
    public static ADMIN_PANEL_ENABLED: boolean;
}

export function loadConfigFromObject (object: AnyObject): void {
    Object.entries(object).forEach(([ name, value ]) => {
        Config[name] = value;
    });
}
