/* Models */
import { Request, Response } from 'express';
import { APIRoute } from 'server/model/API';
import { HTTPMethod } from 'server/model/HTTP';

/* Application files */
import knex from 'server/database/knex';
import { respondSuccess } from 'server/lib/http';

function buildNestedObjectFromQuery (results) {
    return results.reduce((total, current) => {
        const found = total.find((t) => t.inputId === current.inputId);
        const option = { id: current.inputOptionId, name: current.inputOptionName };

        if (found) found.options.push(option);
        else {
            current.options = [ ...(option.id ? [ option ] : []) ];
            total.push(current);
        }

        return total;
    }, []).map((item) => ({
        id: item.inputId,
        name: item.inputName,
        type: item.type,
        ...(item.options.length ? { options: item.options } : [])
    }));
}

export default {
    method: HTTPMethod.GET,
    url: '/api/devices/types/:id',
    controller: async (req: Request, res: Response) => {
        const results = await knex('device_type_inputs')
            .select('*', 'inputs.name AS input_name', 'input_options.name AS input_option_name', 'input_options.id AS input_option_id', 'inputs.id AS input_id')
            .where('device_type_id', req.params.id)
            .leftJoin('inputs', 'device_type_inputs.input_id', 'inputs.id')
            .leftJoin('input_options', 'inputs.id', 'input_options.input_id')
            .orderBy('inputs.id', 'asc');

        return respondSuccess(res, buildNestedObjectFromQuery(results));
    }
} as APIRoute;
