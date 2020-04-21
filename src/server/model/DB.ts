import { DevicePersonType, DeviceStatus } from 'common/model/Device';
import { Receiver } from 'common/model/Receiver';

export enum DBTable {
    DEVICES = 'devices',
    PHOTOS = 'photos',
    RECEIVERS = 'receivers',
    CITIES = 'cities'
}

export type DBSchemaDevice = {
    id?: string;
    type: number;
    personType: DevicePersonType;
    companyName: string;
    nip: string;
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    streetNumber: string;
    city: string;
    postcode: string;
    bankAccount: string;
    status: DeviceStatus;
    comments: string;
    consentTap: number;
    consentInfc: number;
    consentDtcl: number;
    consentPbl: number;
};

export type DBSchemaPhoto = {
    id: string;
    deviceId: string;
    url: string;
};

export type DBSchemaReceiver = {
    id?: string;
} & Receiver;

/* New */

export type DBSchemaCompleteDevice = {
    deviceId: number;
    typeId: number;
    typeName: string;
    personType: DevicePersonType;
    companyName: string;
    nip: string;
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    streetNumber: string;
    city: string;
    postcode: string;
    bankAccount: string;
    status: DeviceStatus;
    comments: string;
    consentTap: number;
    consentInfc: number;
    consentDtcl: number;
    consentPbl?: number;
    inputId: number;
    inputName: string;
    inputType: string;
    optionId?: number;
    optionName?: string;
    value?: string;
    url?: string;
}
