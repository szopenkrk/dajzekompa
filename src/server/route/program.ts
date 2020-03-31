/* Models */
import { Request, Response } from 'express';
import { ProgramSummary } from 'common/model/Program';
import { APIRoute } from 'server/model/API';
import { HTTPMethod, HTTPCode } from 'server/model/HTTP';

/* Application files */
import knex from 'server/database/knex';
import Log from 'server/controller/Log';
import { respondSuccess, closeWithError } from 'server/lib/http';
import { DBTable } from 'server/model/DB';

export default {
    method: HTTPMethod.GET,
    url: '/api/program',
    controller: async (req: Request, res: Response) => {
        const programSummary: ProgramSummary = {
            totalDevices: null
        };

        try {
            const result = await knex(DBTable.DEVICES).count();
            programSummary.totalDevices = parseInt(`${result[0].count}`, 10);
        } catch (error) {
            Log.error(error);

            return closeWithError(res, { error }, HTTPCode.INTERNAL_SERVER_ERROR);
        }

        return respondSuccess(res, programSummary);
    }
} as APIRoute;
