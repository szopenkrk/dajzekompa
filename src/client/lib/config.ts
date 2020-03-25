import { AnyObject } from '../model/Common';

export default class Config {
    public static NODE_ENV: string;
    public static MAINTENANCE_MODE: boolean;
}

export function loadConfigFromObject (object: AnyObject): void {
    Object.entries(object).forEach(([ name, value ]) => {
        Config[name] = value;
    });
}
