/* Models */
import { Request, Response } from 'express';
import { APIRoute } from 'server/model/API';
import { HTTPMethod } from 'server/model/HTTP';

/* Application files */
import knex from 'server/database/knex';
import { respondSuccess } from 'server/lib/http';

export default {
    method: HTTPMethod.GET,
    url: '/api/devices/types',
    controller: async (req: Request, res: Response) => {
        const types = await knex('device_types').select('*');

        return respondSuccess(res, types);
    }
} as APIRoute;
