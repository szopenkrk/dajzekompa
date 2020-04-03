/* Libraries */
import joi from '@hapi/joi';
import multer from 'multer';
import { v4 as uuid } from 'uuid';
import mime from 'mime-types';
import { S3 } from 'aws-sdk';

/* Models */
import { Request, Response } from 'express';
import { Device, DeviceStatus, DeviceType, PersonType } from 'common/model/Device';
import { APIRoute } from 'server/model/API';
import { HTTPCode, HTTPMethod } from 'server/model/HTTP';
import { DBSchemaDevice, DBTable } from 'server/model/DB';

/* Application files */
import knex from 'server/database/knex';
import Log from 'server/controller/Log';
import APIError from 'server/controller/APIError';
import Config from 'server/lib/config';
import { closeWithError, respondSuccess, validateRequestPayload } from 'server/lib/http';

function buildQueryDeviceObject (device: Device): DBSchemaDevice {
    return {
        personType: device.personType,
        email: device.email,
        deviceType: device.deviceType,
        ram: device.ram,
        hdd: device.hdd,
        screenSize: device.screenSize,
        monitor: device.deviceType === DeviceType.NOTEBOOK ? true : device.monitor,
        camera: device.deviceType === DeviceType.NOTEBOOK ? true : device.camera,
        microphone: device.deviceType === DeviceType.NOTEBOOK ? true : device.microphone,
        speakers: device.deviceType === DeviceType.NOTEBOOK ? true : device.speakers,
        comments: device.comments,
        firstName: device.personType === PersonType.PERSON ? device.firstName : '',
        lastName: device.personType === PersonType.PERSON ? device.lastName : '',
        street: device.street,
        streetNumber: device.streetNumber,
        city: device.city,
        postcode: device.postcode,
        companyName: device.personType === PersonType.COMPANY ? device.companyName : '',
        nip: device.personType === PersonType.COMPANY ? device.nip : '',
        notebookName: device.deviceType === DeviceType.NOTEBOOK ? device.notebookName : '',
        status: DeviceStatus.RECEIVED
    };
}

const schema = joi.object({
    personType: joi.string().valid(...[PersonType.PERSON, PersonType.COMPANY]).required(),
    email: joi.string().email().required(),
    deviceType: joi.string().valid(...[DeviceType.NOTEBOOK, DeviceType.DESKTOP]).required(),
    ram: joi.number().required(),
    hdd: joi.number().required(),
    screenSize: joi.number().required(),
    monitor: joi.when('deviceType', { is: DeviceType.DESKTOP, then: joi.boolean().required() }),
    camera: joi.when('deviceType', { is: DeviceType.DESKTOP, then: joi.boolean().required() }),
    microphone: joi.when('deviceType', { is: DeviceType.DESKTOP, then: joi.boolean().required() }),
    speakers: joi.when('deviceType', { is: DeviceType.DESKTOP, then: joi.boolean().required() }),
    notebookName: joi.when('deviceType', { is: DeviceType.NOTEBOOK, then: joi.string().required() }),
    comments: joi.string(),
    firstName: joi.when('personType', { is: PersonType.PERSON, then: joi.string().required() }),
    lastName: joi.when('personType', { is: PersonType.PERSON, then: joi.string().required() }),
    street: joi.string().required(),
    streetNumber: joi.string().required(),
    city: joi.string().required(),
    postcode: joi.string().required(),
    companyName: joi.when('personType', { is: PersonType.COMPANY, then: joi.string().required() }),
    nip: joi.when('personType', { is: PersonType.COMPANY, then: joi.string().required() }),
});

const s3 = new S3({
    accessKeyId: Config.AWS_ACCESS_KEY_ID,
    secretAccessKey: Config.AWS_SECRET_ACCESS_KEY
});

export default {
    method: HTTPMethod.POST,
    url: '/api/devices',
    middleware: [
        multer().array('photos')
    ],
    controller: async (req: Request, res: Response) => {
        let device: Device;

        try {
            device = JSON.parse(req.body.device);
        } catch (error) {
            throw new APIError('Could not parse request payload JSON.', HTTPCode.BAD_REQUEST);
        }

        req.body = await validateRequestPayload(device, schema);

        const uploads = (req.files as Express.Multer.File[]).map((file) => {
            return new Promise<S3.ManagedUpload.SendData>((resolve, reject) => {
                s3.upload({
                    Bucket: Config.AWS_S3_BUCKET_NAME,
                    Key: `${uuid()}.${mime.extension(file.mimetype)}`,
                    Body: file.buffer,
                    ACL: 'public-read'
                }, (error, data) => {
                    if (error) return reject(error);

                    return resolve(data);
                });
            });
        });

        const uploaded = await Promise.all<S3.ManagedUpload.SendData>(uploads);

        try {
            await knex.transaction(async (trx) => {
                const result = await trx(DBTable.DEVICES).insert(buildQueryDeviceObject(device)).returning('id');

                await trx(DBTable.PHOTOS).insert(uploaded.map((u) => ({
                    deviceId: result[0],
                    url: u.Location
                })));
            });
        } catch (error) {
            Log.error(error);

            return closeWithError(res, { error }, HTTPCode.INTERNAL_SERVER_ERROR);
        }

        return respondSuccess(res, device);
    }
} as APIRoute;
