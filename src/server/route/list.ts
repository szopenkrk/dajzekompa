/* Models */
import { Request, Response } from 'express';
import { Device, PersonType, DeviceType } from 'common/model/Device';
import { APIRoute } from 'server/model/API';
import { HTTPMethod, HTTPCode } from 'server/model/HTTP';
import { DBSchemaDevice, DBSchemaPhoto, DBTable } from 'server/model/DB';

/* Application files */
import knex from 'server/database/knex';
import Log from 'server/controller/Log';
import { respondSuccess, closeWithError } from 'server/lib/http';

type DBSchemaDeviceWithPhoto = DBSchemaDevice & DBSchemaPhoto;

function buildDeviceFromDbObject (db: DBSchemaDeviceWithPhoto): Device {
    const device = {
        ...db,
        photos: db.url ? [ db.url ] : []
    };

    delete device.deviceId;
    delete device.url;

    return device;
}

function sanitizeDevice (device: Device): Device {
    if (device.personType === PersonType.PERSON) {
        delete device.companyName;
        delete device.nip;
    }
    if (device.personType === PersonType.COMPANY) {
        delete device.firstName;
        delete device.lastName;
    }
    if (device.deviceType === DeviceType.DESKTOP) {
        delete device.notebookName;
    }
    if (device.deviceType === DeviceType.NOTEBOOK) {
        delete device.camera;
        delete device.speakers;
        delete device.monitor;
        delete device.microphone;
    }

    return device;
}

function buildNestedObjectFromQuery (items: DBSchemaDeviceWithPhoto[]): Device[] {
    return items.reduce((all, current) => {
        const found = all.find((i) => i.id === current.id);

        if (!found) all.push(buildDeviceFromDbObject(current));
        else {
            if (current.url) found.photos.push(current.url);
        }

        return all;
    }, [] as Device[]);
}

export default {
    method: HTTPMethod.GET,
    url: '/api/list',
    controller: async (req: Request, res: Response) => {
        let items: DBSchemaDeviceWithPhoto[];

        try {
            items = await knex(DBTable.DEVICES).select('*', `${DBTable.DEVICES}.id as id`).leftJoin('photos', `${DBTable.DEVICES}.id`, `${DBTable.PHOTOS}.device_id`);
        } catch (error) {
            Log.error(error);

            return closeWithError(res, { error }, HTTPCode.INTERNAL_SERVER_ERROR);
        }

        const devices = buildNestedObjectFromQuery(items).map(sanitizeDevice);

        return respondSuccess(res, devices);
    }
} as APIRoute;
