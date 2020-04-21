// /* Libraries */
// import joi from '@hapi/joi';
// import multer from 'multer';
// import { v4 as uuid } from 'uuid';
// import mime from 'mime-types';
// import { Storage } from '@google-cloud/storage';

// /* Models */
// import { Request, Response } from 'express';
// import { Device, DeviceStatus, DevicePersonType } from 'common/model/Device';
// import { APIRoute } from 'server/model/API';
// import { HTTPCode, HTTPMethod } from 'server/model/HTTP';
// import { DBSchemaDevice, DBTable } from 'server/model/DB';

// /* Application files */
// import knex from 'server/database/knex';
// import Log from 'server/controller/Log';
// import APIError from 'server/controller/APIError';
// import Config from 'server/lib/config';
// import { closeWithError, respondSuccess, validateRequestPayload } from 'server/lib/http';

// function buildQueryDeviceObject (device: Device): DBSchemaDevice {
//     device = { ...device };

//     delete device.photos;

//     return {
//         ...device,
//         type: device.type,
//         companyName: device.personType === DevicePersonType.COMPANY ? device.companyName : '',
//         nip: device.personType === DevicePersonType.COMPANY ? device.nip : '',
//         status: DeviceStatus.RECEIVED
//     };
// }

// const schema = joi.object({
//     personType: joi.string().valid(...[DevicePersonType.PERSON, DevicePersonType.COMPANY]).required(),
//     email: joi.string().email().required(),
//     deviceType: joi.number().required(),
//     comments: joi.string().allow(''),
//     firstName: joi.string().required(),
//     lastName: joi.string().required(),
//     street: joi.string().required(),
//     streetNumber: joi.string().required(),
//     city: joi.string().required(),
//     postcode: joi.string().required(),
//     companyName: joi.when('personType', { is: DevicePersonType.COMPANY, then: joi.string().required() }),
//     nip: joi.when('personType', { is: DevicePersonType.COMPANY, then: joi.string().required() }),
//     bankAccount: joi.string().regex(/^[0-9]{26}$/).required(),
//     consentTap: joi.number().required(),
//     consentInfc: joi.number().required(),
//     consentDtcl: joi.number().required(),
//     consentPbl: joi.number()
// });

// const storage = new Storage({ keyFilename: Config.GOOGLE_APPLICATION_CREDENTIALS });
// const bucket = storage.bucket(Config.GOOGLE_STORAGE_BUCKET);

// export default {
//     method: HTTPMethod.POST,
//     url: '/api/devices',
//     middleware: [
//         multer({
//             limits: {
//                 fieldSize: 25 * 1024 * 1024
//             }
//         }).array('photos')
//     ],
//     controller: async (req: Request, res: Response) => {
//         let sanitizedBody;
//         let device: Device;

//         try {
//             sanitizedBody = JSON.parse(req.body.device);
//         } catch (error) {
//             throw new APIError('Could not parse request payload JSON.', HTTPCode.BAD_REQUEST);
//         }

//         try {
//             device = await validateRequestPayload(sanitizedBody, schema);
//         } catch (error) {
//             const match = error.message.match(/\([a-zA-Z]+\)$/g);
//             const field = match[0] ? match[0].replace(/(\(|\))/g, '') : '';
//             console.log(match, field);

//             throw new APIError(`[Value="${sanitizedBody[field]}"] ${error.message}`);
//         }

//         const uploads = (req.files as Express.Multer.File[]).map((file) => {
//             return new Promise<string>((resolve, reject) => {
//                 const object = bucket.file(`${uuid()}.${mime.extension(file.mimetype)}`);
//                 const stream = object.createWriteStream({ resumable: false });

//                 stream.on('finish', async () => {
//                     await object.makePublic();

//                     return resolve(`https://storage.googleapis.com/${Config.GOOGLE_STORAGE_BUCKET}/${object.name}`);
//                 }).on('error', (error) => {
//                     Log.error(error.message);

//                     return reject('Ups, coś poszło nie tak. Przepraszamy.');
//                 }).end(file.buffer);
//             });
//         });

//         const uploaded = await Promise.all<string>(uploads);

//         try {
//             await knex.transaction(async (trx) => {
//                 const result = await trx(DBTable.DEVICES).insert(buildQueryDeviceObject(device)).returning('id');

//                 await trx(DBTable.PHOTOS).insert(uploaded.map((url) => ({
//                     deviceId: result[0],
//                     url
//                 })));
//             });
//         } catch (error) {
//             Log.error(error);

//             return closeWithError(res, { error }, HTTPCode.INTERNAL_SERVER_ERROR);
//         }

//         return respondSuccess(res, device);
//     }
// } as APIRoute;
