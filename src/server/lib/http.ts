
/* Libraries */
import { AnySchema } from '@hapi/joi';

/* Models */
import { HTTPCode } from '../model/HTTP';
import { AnyObject } from '../model/Object';

/* Application files */
import APIError from '../controller/APIError';

export function respondSuccess (res, data: any = null, status: number = HTTPCode.OK) {
    res.set('Content-Type', 'application/json');

    res.status(status);
    res.send(JSON.stringify({ status: 'ok', data }, null, 4));
}

export function closeWithError (res, data: AnyObject = {}, status = HTTPCode.INTERNAL_SERVER_ERROR) {
    res.setHeader('Content-Type', 'application/json');

    if (data instanceof APIError) {
        data = { message: data.message, code: data.code };
        status = data.code;
    }

    res.status(status);
    res.send(JSON.stringify({ status: 'error', data }, null, 4));
}

export function getRequestOriginIP (req): string {
    if (req.headers['x-forwarded-for']) return req.headers['x-forwarded-for'].split(',').pop();

    return req.connection.remoteAddress || req.socket.remoteAddress || null;
}

export function validateRequestPayload (body: any, schema: AnySchema): Promise<any> {
    const buildPath = (path: (string | number)[]) => {
        return (path.reduce((p, n) => {
            return typeof n === 'string' ? p += `.${n}` : p += `[${n}]`;
        }, '') as string).slice(1);
    };

    return new Promise((resolve, reject) => {
        const { error, value } = schema.validate(body, {
            convert: false,
            stripUnknown: true
        });

        if (error) {
            const msg = `Request validation failed: ${error.details[0].message} (${buildPath(error.details[0].path)})`;

            return reject(new APIError(msg, HTTPCode.BAD_REQUEST));
        }

        return resolve(value);
    });
}
