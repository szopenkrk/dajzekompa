/* Application files */
import knex from 'server/database/knex';

/* Models */
import { DBTable, DBSchemaCompleteReceiver, DBSchemaReceiver, DBSchemaDevice } from 'server/model/DB';

function getReceiverQueryAliases (): string[] {
    return [
        `${DBTable.RECEIVERS}.firstName AS receiverFirstName`,
        `${DBTable.RECEIVERS}.lastName AS receiverLastName`,
        `${DBTable.RECEIVERS}.email AS receiverEmail`,
        `${DBTable.RECEIVERS}.street AS receiverStreet`,
        `${DBTable.RECEIVERS}.streetNumber AS receiverStreetNumber`,
        `${DBTable.RECEIVERS}.postcode AS receiverPostcode`,
        `${DBTable.RECEIVERS}.city AS receiverCity`,
    ]
}

export async function load (id: string): Promise<DBSchemaCompleteReceiver[]> {
    return knex(DBTable.RECEIVERS)
        .select('*', ...getReceiverQueryAliases())
        .leftJoin(DBTable.ASSIGNMENTS, `${DBTable.RECEIVERS}.id`, `${DBTable.ASSIGNMENTS}.receiver_id`)
        .leftJoin(DBTable.DEVICES, `${DBTable.ASSIGNMENTS}.device_id`, `${DBTable.DEVICES}.id`)
        .leftJoin(DBTable.PHOTOS, `${DBTable.PHOTOS}.device_id`, `${DBTable.DEVICES}.id`)
        .where(`${DBTable.RECEIVERS}.id`, id);
}

export function extractReceiverFromRaw (raw: DBSchemaCompleteReceiver[]): DBSchemaReceiver {
    return {
        id: raw[0].receiverId,
        firstName: raw[0].receiverFirstName,
        lastName: raw[0].receiverLastName,
        email: raw[0].receiverEmail,
        street: raw[0].receiverStreet,
        streetNumber: raw[0].receiverStreetNumber,
        postcode: raw[0].receiverPostcode,
        city: raw[0].receiverCity,
    };
}

export function extractDevicesFromRaw (raw: DBSchemaCompleteReceiver[]): DBSchemaDevice[] {
    return raw.reduce((all, current) => {
        const found = all.find((d) => d.deviceId === current.deviceId);

        if (!found) all.push(current);

        return all;
    }, [] as DBSchemaCompleteReceiver[]).map((d) => ({
        id: d.deviceId,
        personType: d.personType,
        companyName: d.companyName,
        nip: d.nip,
        firstName: d.firstName,
        lastName: d.lastName,
        street: d.street,
        streetNumber: d.streetNumber,
        city: d.city,
        postcode: d.postcode,
        email: d.email,
        deviceType: d.deviceType,
        notebookName: d.notebookName,
        ram: d.ram,
        hdd: d.hdd,
        screenSize: d.screenSize,
        camera: d.camera,
        microphone: d.microphone,
        speakers: d.speakers,
        monitor: d.monitor,
        comments: d.comments,
        status: d.status
    }));
}

export function extractPhotosFromRaw (raw: DBSchemaCompleteReceiver[], deviceId: string): string[] {
    return raw
        .filter((d) => d.deviceId === deviceId)
        .map((d) => d.url);
}
