export type RawDevice = {
    id?: string;
    status?: DeviceStatus;
    personType: PersonType;
    firstName?: string;
    lastName?: string;
    street: string;
    streetNumber: string;
    city: string;
    postcode: string;
    companyName?: string;
    nip?: string;
    email: string;
    bankAccount: string;
    deviceType: DeviceType;
    notebookName?: string;
    monitor?: boolean;
    camera?: boolean;
    microphone?: boolean;
    speakers?: boolean;
    photos: string[];
    comments: string;
};

export type Device = RawDevice & {
    ram: number;
    hdd: number;
    screenSize: number;
};

export enum PersonType {
    PERSON = 'PERSON',
    COMPANY = 'COMPANY'
}

export enum DeviceType {
    NOTEBOOK = 'NOTEBOOK',
    DESKTOP = 'DESKTOP',
    TABLET = 'TABLET'
}

export enum DeviceStatus {
    RECEIVED = 'RECEIVED',
    SENT_TO_SERVICE = 'SENT_TO_SERVICE',
    IN_SERVICE = 'IN_SERVICE',
    SERVICE_COMPLETE = 'SERVICE_COMPLETE',
    SENT_TO_RECIPIENT = 'SENT_TO_RECIPIENT',
    COMPLETE = 'COMPLETE'
}
