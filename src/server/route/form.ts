/* Models */
import { Request, Response } from 'express';
import { APIRoute } from '../model/API';
import { HTTPMethod } from '../model/HTTP';

/* Application files */
import { respondSuccess } from '../lib/http';

export default {
    method: HTTPMethod.POST,
    url: '/api/form',
    controller: async (req: Request, res: Response) => {
        return respondSuccess(res, { status: 'up', data: req.body });
    }
} as APIRoute;
