/* Models */
import { Request, Response } from 'express';
import { APIRoute } from 'server/model/API';
import { HTTPMethod } from 'server/model/HTTP';

/* Application files */
import { respondSuccess } from 'server/lib/http';
import OAuth from 'server/lib/oauth';

export default {
    method: HTTPMethod.GET,
    url: '/api/jwks',
    controller: async (req: Request, res: Response) => {
        await OAuth.onLoaded;

        return respondSuccess(res, OAuth.getJwks());
    }
} as APIRoute;
