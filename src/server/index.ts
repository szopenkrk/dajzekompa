/* Libraries */
import express from 'express';

/* Models */
import { Request, Response, NextFunction } from 'express';
import { AddressInfo } from 'net';
import { HTTPCode } from 'server/model/HTTP';

/* Application files */
import Log, { JSErrors } from 'server/controller/Log';
import APIError from 'server/controller/APIError';
import Config from 'server/lib/config';
import Process from 'server/lib/process';
import { closeWithError, validateRequestPayload } from 'server/lib/http';

import middlewares from 'server/middleware';
import routes from 'server/route';

Process.onStop(async () => {
    Log.info('Stopping server');
});

Process.onException(async (error) => {
    if (error) Log.error(`Fatal error: ${error.message}`);

    Log.info('Stopping server');
});

if (Config.STRICT_TLS === false) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const server = express();

for (const middleware of middlewares) {
    server.use(...middleware as any);
}

for (const route of routes) {
    server[route.method.toLowerCase()](route.url, ...(route.middleware || []), async (req: Request, res: Response, next: NextFunction) => {
        Log.info(`${route.method} ${route.url}`);

        if (route.schema) {
            try {
                req.body = await validateRequestPayload(req.body, route.schema);
            } catch (error) {
                return closeWithError(res, error);
            }
        }

        try {
            await route.controller(req, res, next);
        } catch (error) {
            if (JSErrors.includes(error.name) || error.code === HTTPCode.INTERNAL_SERVER_ERROR) {
                Log.error(error.message);

                return closeWithError(res, new APIError('There has been a technical error.'));
            }

            return closeWithError(res, error);
        }
    });
}

const instance = server.listen(Config.PORT, () => {
    const { address, port } = instance.address() as AddressInfo;

    Log.info(`Server listening on ${address}:${port}`);
});
