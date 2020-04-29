/* Models */
import { AnySchema } from '@hapi/joi';
import { RequestHandler } from 'express';
import { HTTPMethod } from 'server/model/HTTP';

export type APIRoute = {
    method: HTTPMethod;
    url: string;
    schema?: AnySchema;
    protected?: boolean;
    middleware?: RequestHandler[];
    controller: RequestHandler;
};
