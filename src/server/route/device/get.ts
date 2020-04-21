/* Models */
import { Request, Response } from 'express';
import { APIRoute } from 'server/model/API';
import { HTTPMethod } from 'server/model/HTTP';

/* Application files */
import { respondSuccess } from 'server/lib/http';
import { getCompleteDevice } from 'server/service/devices';

export default {
    method: HTTPMethod.GET,
    url: '/api/devices/:id',
    controller: async (req: Request, res: Response) => {
        const device = await getCompleteDevice(parseInt(req.params.id));

        return respondSuccess(res, device);
    }
} as APIRoute;
