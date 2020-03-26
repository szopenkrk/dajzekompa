export enum PersonType {
    PERSON = 'PERSON',
    COMPANY = 'COMPANY'
}

export enum DeviceType {
    NOTEBOOK = 'NOTEBOOK',
    DESKTOP = 'DESKTOP'
}

export type Device = {
    personType: PersonType;
    firstName?: string;
    lastName?: string;
    companyName?: string;
    nip?: string;
    email: string;
    deviceType: DeviceType;
    notebookName?: string;
    ram: number;
    hdd: number;
    screenSize: number;
    monitor?: boolean;
    camera?: boolean;
    microphone?: boolean;
    speakers?: boolean;
    comments: string;
};
