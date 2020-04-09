import { PersonType, DeviceType, DeviceStatus } from 'common/model/Device';
import { Receiver } from 'common/model/Receiver';

export enum DBTable {
    DEVICES = 'devices',
    PHOTOS = 'photos',
    RECEIVERS = 'receivers',
    CITIES = 'cities',
    USERS = 'users'
}

export type DBSchemaDevice = {
    id?: string;
    personType: PersonType;
    companyName: string;
    nip: string;
    firstName: string;
    lastName: string;
    street: string;
    streetNumber: string;
    city: string;
    postcode: string;
    email: string;
    bankAccount: string;
    deviceType: DeviceType;
    notebookName: string;
    ram: number;
    hdd: number;
    screenSize: number;
    camera: boolean;
    microphone: boolean;
    speakers: boolean;
    monitor: boolean;
    comments: string;
    status: DeviceStatus;
};

export type DBSchemaPhoto = {
    id: string;
    deviceId: string;
    url: string;
};

export type DBSchemaReceiver = {
    id?: string;
} & Receiver;

export type DBSchemaUser = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};
