/* Models */
import { Request, Response } from 'express';
import { APIRoute } from '../model/API';
import { HTTPMethod } from '../model/HTTP';

/* Application files */
import { respondSuccess } from '../lib/http';

export default {
    method: HTTPMethod.GET,
    url: '/status',
    controller: async (req: Request, res: Response) => {
        return respondSuccess(res, { status: 'up' });
    }
} as APIRoute;
