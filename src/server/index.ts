/* Libraries */
import express from 'express';

/* Models */
import { Request, Response, NextFunction } from 'express';
import { AddressInfo } from 'net';
import { HTTPCode } from './model/HTTP';

/* Application files */
import Log, { JSErrors } from './controller/Log';
import APIError from './controller/APIError';
import Config from './lib/config';
import Process from './lib/process';
import { closeWithError } from './lib/http';

import middlewares from './middleware';
import routes from './route';

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

for (let middleware of middlewares) {
    server.use(...middleware as any);
}

for (let route of routes) {
    server[route.method.toLowerCase()](route.url, async (req: Request, res: Response, next: NextFunction) => {
        Log.info(`${route.method} ${route.url}`);

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
