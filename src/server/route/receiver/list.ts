/* Models */
import { Request, Response } from 'express';
import { APIRoute } from 'server/model/API';
import { HTTPMethod, HTTPCode } from 'server/model/HTTP';
import { DBTable, DBSchemaReceiver } from 'server/model/DB';

/* Application files */
import knex from 'server/database/knex';
import Log from 'server/controller/Log';
import { respondSuccess, closeWithError } from 'server/lib/http';
import { Receiver } from 'common/model/Receiver';

function sanitizeReceiver (receiver: DBSchemaReceiver): Receiver {
    return receiver;
}

export default {
    method: HTTPMethod.GET,
    url: '/api/receivers',
    controller: async (req: Request, res: Response) => {
        let items: DBSchemaReceiver[];

        try {
            items = await knex(DBTable.RECEIVERS).select();
        } catch (error) {
            Log.error(error);

            return closeWithError(res, { error }, HTTPCode.INTERNAL_SERVER_ERROR);
        }

        const receivers = items.map(sanitizeReceiver);

        return respondSuccess(res, receivers);
    }
} as APIRoute;
