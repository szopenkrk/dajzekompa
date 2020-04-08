/* Models */
import { Request, Response } from 'express';
import { APIRoute } from 'server/model/API';
import { HTTPMethod } from 'server/model/HTTP';

/* Application files */
import { respondSuccess } from 'server/lib/http';
import lockers from 'server/inpost.json';

export default {
    method: HTTPMethod.GET,
    url: '/api/lockers',
    controller: async (req: Request, res: Response) => {
        const parsed = lockers.map((locker) => ({
            label: `${locker.address.trimEnd()}, ${locker.postcode} ${locker.city} (${locker.id})`,
            id: locker.id
        }));

        return respondSuccess(res, parsed);
    }
} as APIRoute;
