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
import { DeviceStatus } from 'common/model/Device';

export default {
    method: HTTPMethod.GET,
    url: '/api/program',
    controller: async (req: Request, res: Response) => {
        const programSummary: ProgramSummary = {
            statuses: {
                [DeviceStatus.RECEIVED]: 0,
                [DeviceStatus.SENT_TO_SERVICE]: 0,
                [DeviceStatus.IN_SERVICE]: 0,
                [DeviceStatus.SENT_TO_RECIPIENT]: 0,
                [DeviceStatus.COMPLETE]: 0
            }
        };

        try {
            const result = await knex(DBTable.DEVICES).select('status').count('status as total').groupBy('status');

            result.forEach((item) => {
                programSummary.statuses[item.status] = parseInt(item.total, 10);
            });
        } catch (error) {
            Log.error(error);

            return closeWithError(res, { error }, HTTPCode.INTERNAL_SERVER_ERROR);
        }

        return respondSuccess(res, programSummary);
    }
} as APIRoute;
