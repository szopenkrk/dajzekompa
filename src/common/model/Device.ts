export type Device = {
    id: number;
    type: DeviceType;
    personType: DevicePersonType;
    companyName?: string;
    nip?: string;
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    streetNumber: string;
    city: string;
    postcode: string;
    bankAccount: string;
    status?: DeviceStatus;
    comments: string;
    photos: string[];
    inputs: DeviceInputData[];
    consentTap: number;
    consentInfc: number;
    consentDtcl: number;
    consentPbl: number;
};

export enum DevicePersonType {
    PERSON = 'PERSON',
    COMPANY = 'COMPANY'
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

export type DeviceInputData = {
    id: number;
    name: string;
    type: DeviceInputType;
    value?: string;
    option?: DeviceInputOption;
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
