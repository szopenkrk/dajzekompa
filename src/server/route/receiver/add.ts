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
import APIError from 'server/controller/APIError';

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
    caretakerFirstName: joi.when('personType', { is: ReceiverPersonType.STUDENT, then: joi.string().required() }),
    caretakerLastName: joi.when('personType', { is: ReceiverPersonType.STUDENT, then: joi.string().required() }),
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
    consentCrtr: joi.when('personType', { is: ReceiverPersonType.STUDENT, then: joi.number().required() })
});

export default {
    method: HTTPMethod.POST,
    url: '/api/receivers',
    controller: async (req: Request, res: Response) => {
        let sanitizedBody;

        try {
            sanitizedBody = await validateRequestPayload(req.body, schema);
        } catch (error) {
            const match = error.message.match(/\([a-zA-Z]+\)$/g);
            const field = match[0] ? match[0].replace(/(\(|\))/g, '') : '';

            throw new APIError(`[Value="${req.body[field]}"] ${error.message}`);
        }

        const receiver: Receiver = sanitizedBody;

        try {
            await knex(DBTable.RECEIVERS).insert(buildQueryReceiverObject(sanitizedBody));
        } catch (error) {
            Log.error(error);

            return closeWithError(res, { error }, HTTPCode.INTERNAL_SERVER_ERROR);
        }

        return respondSuccess(res, receiver);
    }
} as APIRoute;
