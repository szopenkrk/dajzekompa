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

            return respondSuccess(res, { message: 'Wniosek został przyjęty.' });
        } catch (error) {
            Log.error(error);

            return closeWithError(res, { error }, HTTPCode.INTERNAL_SERVER_ERROR);
        }
    }
} as APIRoute;
