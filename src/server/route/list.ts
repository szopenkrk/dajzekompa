/* Models */
import { Request, Response } from 'express';
import { APIRoute } from '../model/API';
import { HTTPMethod, HTTPCode } from '../model/HTTP';

/* Application files */
import knex from '../database/knex';
import Log from '../controller/Log';
import { respondSuccess, closeWithError } from '../lib/http';

export default {
    method: HTTPMethod.GET,
    url: '/api/list',
    controller: async (req: Request, res: Response) => {
        let items: any[];

        try {
            items = await knex('applications').select();
        } catch (error) {
            Log.error(error);

            return closeWithError(res, { error }, HTTPCode.INTERNAL_SERVER_ERROR);
        }

        items = items.map((item) => {
            if (item.personType === 'PERSON') {
                delete item.companyName;
                delete item.nip;
            }
            if (item.personType === 'COMPANY') {
                delete item.firstName;
                delete item.lastName;
            }
            if (item.deviceType === 'DESKTOP') {
                delete item.notebookName;
            }
            if (item.deviceType === 'NOTEBOOK') {
                delete item.camera;
                delete item.speakers;
                delete item.monitor;
                delete item.microphone;
            }

            return item;
        });

        return respondSuccess(res, items);
    }
} as APIRoute;
