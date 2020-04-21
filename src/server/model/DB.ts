import { Device, DeviceStatus, DeviceInputType } from 'common/model/Device';
import { Receiver } from 'common/model/Receiver';

export enum DBTable {
    DEVICES = 'devices',
    DEVICE_DATA = 'device_data',
    DEVICE_TYPES = 'device_types',
    DEVICE_TYPE_INPUTS = 'device_type_inputs',
    INPUTS = 'inputs',
    INPUT_OPTIONS = 'input_options',
    PHOTOS = 'photos',
    RECEIVERS = 'receivers',
    CITIES = 'cities'
}

export type DBSchemaDevice = {
    id: number;
    typeId: number;
    companyName: string;
    nip: string;
    status: DeviceStatus;
} & Omit<Device, 'photos' | 'inputs' | 'type'>;

export type DBSchemaReceiver = {
    id?: string;
} & Receiver;

export type DBSchemaCompleteDevice = {
    typeId: number;
    typeName: string;
    inputName: string;
    inputType: string;
    optionName?: string;
    url?: string;
} & DBSchemaDevice & DBSchemaDeviceData;

export type DBSchemaDeviceData = {
    deviceId: number;
    inputId: number;
    optionId?: number;
    value?: string;
}

export type DBSchemaDeviceType = {
    id: number;
    name: string;
}

export type DBSchemaInput = {
    id: number;
    name: string;
    type: DeviceInputType;
}
