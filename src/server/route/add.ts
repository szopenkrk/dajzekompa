/* Libraries */
import joi from '@hapi/joi';
import multer from 'multer';
import { v4 as uuid } from 'uuid';
import mime from 'mime-types';
import { S3 } from 'aws-sdk';

/* Models */
import { Request, Response } from 'express';
import { APIRoute } from '../model/API';
import { PersonType, DeviceType } from '../model/Device';
import { HTTPMethod, HTTPCode } from '../model/HTTP';

/* Application files */
import knex from '../database/knex';
import Log from '../controller/Log';
import APIError from '../controller/APIError';
import Config from '../lib/config';
import { respondSuccess, closeWithError, validateRequestPayload } from '../lib/http';

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
    notebookName: joi.when('deviceType', { is: DeviceType.DESKTOP, then: joi.string().required() }),
    comments: joi.string(),
    firstName: joi.when('personType', { is: PersonType.PERSON, then: joi.string().required() }),
    lastName: joi.when('personType', { is: PersonType.PERSON, then: joi.string().required() }),
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
        let application;
        console.log(req.files);

        try {
            application = JSON.parse(req.body.application);
        } catch (error) {
            throw new APIError('Could not parse request payload JSON.', HTTPCode.BAD_REQUEST);
        }

        req.body = await validateRequestPayload(application, schema);

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
        console.log(JSON.stringify(uploaded, null, 4));

        try {
            await knex.transaction(async (trx) => {
                const result = await trx('applications').insert({
                    personType: application.personType,
                    email: application.email,
                    deviceType: application.deviceType,
                    ram: `${application.ram}`,
                    hdd: `${application.hdd}`,
                    screenSize: `${application.screenSize}`,
                    monitor: application.deviceType === DeviceType.NOTEBOOK ? true : application.monitor,
                    camera: application.deviceType === DeviceType.NOTEBOOK ? true : application.camera,
                    microphone: application.deviceType === DeviceType.NOTEBOOK ? true : application.microphone,
                    speakers: application.deviceType === DeviceType.NOTEBOOK ? true : application.speakers,
                    comments: application.comments,
                    ...(application.personType === PersonType.PERSON ? {
                        firstName: application.firstName,
                        lastName: application.lastName
                    } : {
                        companyName: application.companyName,
                        nip: application.nip
                    }),
                    ...(application.deviceType === DeviceType.NOTEBOOK ? {
                        notebookName: application.notebookName
                    } : {})
                }).returning('id');

                await trx('photos').insert(uploaded.map((u) => ({
                    applicationId: result[0],
                    url: u.Location
                })));
            });
        } catch (error) {
            Log.error(error);

            return closeWithError(res, { error }, HTTPCode.INTERNAL_SERVER_ERROR);
        }

        return respondSuccess(res, { message: 'Wniosek został przyjęty.' });
    }
} as APIRoute;
