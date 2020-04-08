/* Models */
import { DBSchemaReceiver } from 'server/model/DB';

/* Application files */
import { load, extractReceiverFromRaw, extractDevicesFromRaw, extractPhotosFromRaw } from 'server/database/receivers';
import Address from 'server/database/Address';
import Device from 'server/database/Device';

export default class Receiver {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    address: Address;
    devices: Device[] = [];

    constructor (raw: Partial<DBSchemaReceiver>) {
        this.id = raw.id;
        this.firstName = raw.firstName;
        this.lastName = raw.lastName;
        this.email = raw.email;
        this.address = new Address(raw);
    }

    toJson (depth?: number) {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            ...this.address.toJson(),
            devices: this.devices.map((d) => depth > 1 ? d.toJson(depth - 1) : d.id)
        };
    }

    static async fromDatabase (id: string): Promise<Receiver> {
        const raw = await load(id);
        const rawReceiver = extractReceiverFromRaw(raw);
        const rawDevices = extractDevicesFromRaw(raw);

        const receiver = new Receiver(rawReceiver);
        receiver.devices = rawDevices.map((d) => new Device(d, extractPhotosFromRaw(raw, d.id)));

        return receiver;
    }
}
