/* Models */
import { Request, Response } from 'express';
import { APIRoute } from 'server/model/API';
import { HTTPMethod } from 'server/model/HTTP';

/* Application files */
import { respondSuccess } from 'server/lib/http';
import { listDevices } from 'server/service/devices';

export default {
    method: HTTPMethod.GET,
    url: '/api/devices',
    controller: async (req: Request, res: Response) => {
        const devices = await listDevices();

        return respondSuccess(res, devices);
    }
} as APIRoute;
