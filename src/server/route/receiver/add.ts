/* Libraries */
import joi from '@hapi/joi';

/* Models */
import { Request, Response } from 'express';
import { APIRoute } from 'server/model/API';
import { HTTPCode, HTTPMethod } from 'server/model/HTTP';
import { DBTable, DBSchemaReceiver } from 'server/model/DB';

/* Application files */
import knex from 'server/database/knex';
import Log from 'server/controller/Log';
import { closeWithError, respondSuccess, validateRequestPayload } from 'server/lib/http';
import { Receiver, ReceiverPersonType } from 'common/model/Receiver';

function buildQueryReceiverObject (receiver: Receiver): DBSchemaReceiver {
    return {
        ...receiver,
        complete: false
    };
}

const schema = joi.object({
    personType: joi.string().valid(...[ ReceiverPersonType.STUDENT, ReceiverPersonType.TEACHER ]).required(),
    email: joi.string().email().required(),
    phone: joi.string().regex(/^\+[0-9]{11}$/).required(),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    street: joi.string().required(),
    streetNumber: joi.string().required(),
    city: joi.string().required(),
    postcode: joi.string().required(),
    locker: joi.string().required(),
    school: joi.string().required(),
    grade: joi.when('personType', { is: ReceiverPersonType.STUDENT, then: joi.string().required() }),
    consentTap: joi.number().required(),
    consentInfc: joi.number().required(),
    consentSchv: joi.number().required(),
    consentCrtr: joi.number().required()
});

export default {
    method: HTTPMethod.POST,
    url: '/api/receivers',
    controller: async (req: Request, res: Response) => {
        req.body = await validateRequestPayload(req.body, schema);

        const receiver: Receiver = req.body;

        try {
            await knex(DBTable.RECEIVERS).insert(buildQueryReceiverObject(req.body));
        } catch (error) {
            Log.error(error);

            return closeWithError(res, { error }, HTTPCode.INTERNAL_SERVER_ERROR);
        }

        return respondSuccess(res, receiver);
    }
} as APIRoute;
