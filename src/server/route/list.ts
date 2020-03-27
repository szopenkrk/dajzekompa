/* Models */
import { Request, Response } from 'express';
import { APIRoute } from '../model/API';
import { HTTPMethod, HTTPCode } from '../model/HTTP';

/* Application files */
import knex from '../database/knex';
import Log from '../controller/Log';
import { respondSuccess, closeWithError } from '../lib/http';

function buildNestedObjectFromQuery (items: any[]) {
    return items.map((item) => {
        item.id = item.applicationId;
        delete item.applicationId;

        return item;
    }).reduce((all, current) => {
        const found = all.find((i) => i.id === current.id);

        if (!found) {
            current.photos = [ current.url ];
            delete current.url;

            all.push(current);
        } else {
            found.photos.push(current.url)
        }

        return all;
    }, []);
}

export default {
    method: HTTPMethod.GET,
    url: '/api/list',
    controller: async (req: Request, res: Response) => {
        let items: any[];

        try {
            items = await knex('applications').select().leftJoin('photos', 'applications.id', 'photos.application_id');
        } catch (error) {
            Log.error(error);

            return closeWithError(res, { error }, HTTPCode.INTERNAL_SERVER_ERROR);
        }

        items = buildNestedObjectFromQuery(items).map((item) => {
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
