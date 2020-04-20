export type RawDevice = {
    id?: string;
    status?: DeviceStatus;
    personType: DevicePersonType;
    firstName: string;
    lastName: string;
    street: string;
    streetNumber: string;
    city: string;
    postcode: string;
    companyName?: string;
    nip?: string;
    email: string;
    bankAccount: string;
    deviceType: number;
    notebookName?: string;
    monitor?: boolean;
    camera?: boolean;
    microphone?: boolean;
    speakers?: boolean;
    photos: string[];
    comments: string;
    consentTap: number;
    consentInfc: number;
    consentDtcl: number;
    consentPbl: number;
};

export type Device = RawDevice & {
    ram: number;
    hdd: number;
    screenSize: number;
};

export enum DevicePersonType {
    PERSON = 'PERSON',
    COMPANY = 'COMPANY'
}

export enum DeviceTypeOld {
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

/* New */

export type DeviceType = {
    id: number;
    name: string;
}

export type DeviceInput = {
    id: number;
    name: string;
    type: DeviceInputType;
    options?: DeviceInputOption[];
}

export type DeviceInputOption = {
    id: number;
    name: string;
}

export enum DeviceInputType {
    TEXT = 'TEXT',
    RADIO = 'RADIO',
    CHECKBOX = 'CHECKBOX',
    DROPDOWN = 'DROPDOWN'
}
