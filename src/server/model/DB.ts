import { PersonType, DeviceType, DeviceStatus } from 'common/model/Device';

export enum DBTable {
    DEVICES = 'devices',
    PHOTOS = 'photos'
}

export type DBSchemaDevice = {
    id?: string;
    personType: PersonType;
    companyName: string;
    companyEmail: string;
    companyAddress: string;
    nip: string;
    name: string;
    surname: string;
    firstName: string;
    lastName: string;
    address: string;
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
