/* Libraries */
import joi from '@hapi/joi';

/* Models */
import { Request, Response } from 'express';
import { APIRoute } from '../model/API';
import { HTTPMethod, HTTPCode } from '../model/HTTP';

/* Application files */
import knex from '../database/knex';
import Log from '../controller/Log';
import { respondSuccess, closeWithError } from '../lib/http';

export default {
    method: HTTPMethod.POST,
    url: '/api/form',
    schema: joi.object({
        personType: joi.string().valid(...['PERSON', 'COMPANY']).required(),
        email: joi.string().email().required(),
        deviceType: joi.string().valid(...['NOTEBOOK', 'DESKTOP']).required(),
        ram: joi.number().required(),
        hdd: joi.number().required(),
        screenSize: joi.number().required(),
        monitor: joi.when('deviceType', { is: 'DESKTOP', then: joi.boolean().required() }),
        camera: joi.when('deviceType', { is: 'DESKTOP', then: joi.boolean().required() }),
        microphone: joi.when('deviceType', { is: 'DESKTOP', then: joi.boolean().required() }),
        speakers: joi.when('deviceType', { is: 'DESKTOP', then: joi.boolean().required() }),
        notebookName: joi.when('deviceType', { is: 'NOTEBOOK', then: joi.string().required() }),
        comments: joi.string(),
        firstName: joi.when('personType', { is: 'PERSON', then: joi.string().required() }),
        lastName: joi.when('personType', { is: 'PERSON', then: joi.string().required() }),
        companyName: joi.when('personType', { is: 'COMPANY', then: joi.string().required() }),
        nip: joi.when('personType', { is: 'COMPANY', then: joi.string().required() }),
    }),
    controller: async (req: Request, res: Response) => {
        try {
            await knex('applications').insert({
                personType: req.body.personType,
                email: req.body.email,
                deviceType: req.body.deviceType,
                ram: `${req.body.ram}`,
                hdd: `${req.body.hdd}`,
                screenSize: `${req.body.screenSize}`,
                monitor: req.body.deviceType === 'NOTEBOOK' ? true : req.body.monitor,
                camera: req.body.deviceType === 'NOTEBOOK' ? true : req.body.camera,
                microphone: req.body.deviceType === 'NOTEBOOK' ? true : req.body.microphone,
                speakers: req.body.deviceType === 'NOTEBOOK' ? true : req.body.speakers,
                comments: req.body.comments,
                ...(req.body.personType === 'person' ? {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                } : {
                    companyName: req.body.companyName,
                    nip: req.body.nip
                }),
                ...(req.body.deviceType === 'NOTEBOOK' ? {
                    notebookName: req.body.notebookName
                } : {})
            });
        } catch (error) {
            Log.error(error);

            return closeWithError(res, { error }, HTTPCode.INTERNAL_SERVER_ERROR);
        }

        return respondSuccess(res, { message: 'Wniosek został przyjęty.' });
    }
} as APIRoute;
