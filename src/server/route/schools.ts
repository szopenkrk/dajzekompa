/* Models */
import { Request, Response } from 'express';
import { APIRoute } from 'server/model/API';
import { HTTPMethod } from 'server/model/HTTP';

/* Application files */
import { respondSuccess } from 'server/lib/http';
import schools from 'server/schools.json';

export default {
    method: HTTPMethod.GET,
    url: '/api/schools',
    controller: async (req: Request, res: Response) => {
        const parsed = schools.map((school) => school.name);

        return respondSuccess(res, parsed);
    }
} as APIRoute;
