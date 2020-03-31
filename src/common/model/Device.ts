export type Device = {
    id?: string;
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
    photos: string[];
    comments: string;
    status: DeviceStatus;
};

export enum PersonType {
    PERSON = 'PERSON',
    COMPANY = 'COMPANY'
}

export enum DeviceType {
    NOTEBOOK = 'NOTEBOOK',
    DESKTOP = 'DESKTOP'
}

export enum DeviceStatus {
    RECEIVED = 'RECEIVED',
    SENT_TO_SERVICE = 'SENT_TO_SERVICE',
    IN_SERVICE = 'IN_SERVICE',
    SENT_TO_RECIPIENT = 'SENT_TO_RECIPIENT',
    COMPLETE = 'COMPLETE'
}
