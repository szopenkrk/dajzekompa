/* Models */
import { AnySchema } from '@hapi/joi';
import { RequestHandler } from 'express';
import { HTTPMethod } from './HTTP';

export type APIRoute = {
    method: HTTPMethod;
    url: string;
    schema?: AnySchema;
    controller: RequestHandler;
};
