import { PersonType, DeviceType, DeviceStatus } from 'common/model/Device';

export enum DBTable {
    DEVICES = 'devices',
    PHOTOS = 'photos'
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
