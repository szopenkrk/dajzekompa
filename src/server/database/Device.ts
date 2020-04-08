/* Models */
import { Device as DeviceObject, PersonType, DeviceType, DeviceStatus } from 'common/model/Device';
import { DBSchemaDevice } from 'server/model/DB';

/* Application files */
import Address from 'server/database/Address';

export default class Device {
    id: string;
    personType: PersonType;
    companyName: string;
    nip: string;
    firstName: string;
    lastName: string;
    email: string;
    address: Address;
    deviceType: DeviceType;
    status: DeviceStatus;
    notebookName: string;
    ram: number;
    hdd: number;
    screenSize: number;
    camera: boolean;
    microphone: boolean;
    speakers: boolean;
    monitor: boolean;
    photos: string[];
    comments: string;

    constructor (raw: Partial<DBSchemaDevice>, photos: string[] = []) {
        this.id = raw.id;
        this.personType = raw.personType;
        this.companyName = raw.companyName;
        this.nip = raw.nip;
        this.firstName = raw.firstName;
        this.lastName = raw.lastName;
        this.email = raw.email;
        this.address = new Address(raw);
        this.deviceType = raw.deviceType;
        this.status = raw.status;
        this.notebookName = raw.notebookName;
        this.ram = raw.ram;
        this.hdd = raw.hdd;
        this.screenSize = raw.screenSize;
        this.camera = raw.camera;
        this.microphone = raw.microphone;
        this.speakers = raw.speakers;
        this.monitor = raw.monitor;
        this.comments = raw.comments;
        this.photos = photos;
    }

    toJson (depth?: number): DeviceObject {
        return {
            id: this.id,
            personType: this.personType,
            ...(this.personType === PersonType.COMPANY ? { companyName: this.companyName } : {}),
            ...(this.personType === PersonType.COMPANY ? { nip: this.nip } : {}),
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            ...this.address.toJson(),
            deviceType: this.deviceType,
            status: this.status,
            ...(this.deviceType === DeviceType.NOTEBOOK ? { notebookName: this.notebookName } : {}),
            ram: this.ram,
            hdd: this.hdd,
            screenSize: this.screenSize,
            ...(this.deviceType === DeviceType.DESKTOP ? { camera: this.camera } : {}),
            ...(this.deviceType === DeviceType.DESKTOP ? { microphone: this.microphone } : {}),
            ...(this.deviceType === DeviceType.DESKTOP ? { speakers: this.speakers } : {}),
            ...(this.deviceType === DeviceType.DESKTOP ? { monitor: this.monitor } : {}),
            photos: depth > 1 ? this.photos : [],
            comments: this.comments
        };
    }
}
