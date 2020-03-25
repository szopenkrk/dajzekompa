/* Models */
import { SchemaLike } from 'joi';
import { RequestHandler } from 'express';
import { HTTPMethod } from './HTTP';

export type APIRoute = {
    method: HTTPMethod;
    url: string;
    schema?: SchemaLike;
    controller: RequestHandler;
};
