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
    url: '/api/program',
    controller: async (req: Request, res: Response) => {
        let totalDevices: number;

        try {
            const result = await knex('applications').count();
            totalDevices = parseInt(`${result[0].count}`, 10);
        } catch (error) {
            Log.error(error);

            return closeWithError(res, { error }, HTTPCode.INTERNAL_SERVER_ERROR);
        }

        return respondSuccess(res, { totalDevices });
    }
} as APIRoute;
