/* Libraries */
import joi from '@hapi/joi';

/* Models */
import { Request, Response } from 'express';
import { User } from 'common/model/User';
import { APIRoute } from 'server/model/API';
import { DBSchemaUser, DBTable } from 'server/model/DB';
import { HTTPMethod, HTTPCode } from 'server/model/HTTP';

/* Application files */
import knex from 'server/database/knex';
import { respondSuccess, validateRequestPayload } from 'server/lib/http';
import APIError from 'server/controller/APIError';

const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

async function getUserFromDatabase (email: string, password: string): Promise<DBSchemaUser> {
    const result = await knex(DBTable.USERS).select('*').where('email', email).andWhere('password', password);

    if (!result.length) throw new APIError('Niepoprawne dane.', HTTPCode.UNAUTHORIZED);

    return result[0];
}

async function createUserToken (user: DBSchemaUser): Promise<string> {
    return '23.2n1xy041u3k<08s4y283!y32x4132';
}

export default {
    method: HTTPMethod.POST,
    url: '/api/user/signin',
    controller: async (req: Request, res: Response) => {
        req.body = await validateRequestPayload(req.body, schema);

        const user = await getUserFromDatabase(req.body.email, req.body.password);
        const token = await createUserToken(user);
        const response: User = { ...user, token };

        return respondSuccess(res, response);
    }
} as APIRoute;
