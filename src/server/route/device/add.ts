/* Libraries */
import joi from '@hapi/joi';
import multer from 'multer';

/* Models */
import { Request, Response } from 'express';
import { DevicePersonType, DeviceUpsertRequest, } from 'common/model/Device';
import { APIRoute } from 'server/model/API';
import { HTTPCode, HTTPMethod } from 'server/model/HTTP';

/* Application files */
import APIError from 'server/controller/APIError';
import { respondSuccess, validateRequestPayload } from 'server/lib/http';
import { insertCompleteDevice, getCompleteDevice } from 'server/service/devices';
import { uploadFiles } from 'server/service/gcloud';

const schema = joi.object().keys({
    type: joi.number().required(),
    personType: joi.string().valid(...[ DevicePersonType.PERSON, DevicePersonType.COMPANY ]).required(),
    companyName: joi.when('personType', { is: DevicePersonType.COMPANY, then: joi.string().required() }),
    nip: joi.when('personType', { is: DevicePersonType.COMPANY, then: joi.string().required() }),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    street: joi.string().required(),
    streetNumber: joi.string().required(),
    city: joi.string().required(),
    postcode: joi.string().required(),
    bankAccount: joi.string().regex(/^[0-9]{26}$/).required(),
    comments: joi.string().allow(''),
    consentTap: joi.number().required(),
    consentInfc: joi.number().required(),
    consentDtcl: joi.number().required(),
    consentPbl: joi.number(),
    inputs: joi.array().items(joi.object().keys({
        id: joi.number().required(),
        value: joi.string(),
        option: joi.number()
    }).or('value', 'option')).required()
});

export default {
    method: HTTPMethod.POST,
    url: '/api/devices',
    middleware: [
        multer({
            limits: {
                fieldSize: 25 * 1024 * 1024
            }
        }).array('photos')
    ],
    controller: async (req: Request, res: Response) => {
        let body: DeviceUpsertRequest;

        try {
            body = JSON.parse(req.body.device);
        } catch (error) {
            throw new APIError('Could not parse request payload JSON.', HTTPCode.BAD_REQUEST);
        }

        body = await validateRequestPayload(body, schema);

        const uploaded = await uploadFiles(req.files as Express.Multer.File[]);
        const deviceId = await insertCompleteDevice(body, uploaded);
        const device = await getCompleteDevice(deviceId);

        return respondSuccess(res, device);
    }
} as APIRoute;
