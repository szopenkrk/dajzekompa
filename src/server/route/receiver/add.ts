/* Libraries */
import joi from '@hapi/joi';

/* Models */
import { Request, Response } from 'express';
import { PersonType } from 'common/model/Device';
import { APIRoute } from 'server/model/API';
import { HTTPCode, HTTPMethod } from 'server/model/HTTP';
import { DBTable, DBSchemaReceiver } from 'server/model/DB';

/* Application files */
import knex from 'server/database/knex';
import Log from 'server/controller/Log';
import { closeWithError, respondSuccess, validateRequestPayload } from 'server/lib/http';
import { Receiver } from 'common/model/Receiver';

function buildQueryReceiverObject (receiver: Receiver): DBSchemaReceiver {
    return {
        email: receiver.email,
        firstName: receiver.firstName,
        lastName: receiver.lastName,
        street: receiver.street,
        streetNumber: receiver.streetNumber,
        city: receiver.city,
        postcode: receiver.postcode
    };
}

const schema = joi.object({
    email: joi.string().email().required(),
    firstName: joi.when('personType', { is: PersonType.PERSON, then: joi.string().required() }),
    lastName: joi.when('personType', { is: PersonType.PERSON, then: joi.string().required() }),
    street: joi.string().required(),
    streetNumber: joi.string().required(),
    city: joi.string().required(),
    postcode: joi.string().required()
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