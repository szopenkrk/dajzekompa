/* Models */
import { DeviceInput, DeviceInputType, DevicePersonType, Device } from 'common/model/Device';
import { Request, Response } from 'express';
import { APIRoute } from 'server/model/API';
import { HTTPMethod } from 'server/model/HTTP';

/* Application files */
import knex from 'server/database/knex';
import { respondSuccess } from 'server/lib/http';
import { DBSchemaCompleteDevice } from 'server/model/DB';

function mergeDeviceInputs (raw: DBSchemaCompleteDevice, inputs: DeviceInput[] = []) {
    if (inputs.findIndex((i) => i.id === raw.inputId) !== -1) return inputs;

    return [
        ...inputs,
        {
            id: raw.inputId,
            name: raw.inputName,
            type: raw.inputType as DeviceInputType,
            ...(raw.value ? { value: raw.value } : {}),
            ...(raw.optionId ? {
                option: {
                    id: raw.optionId,
                    name: raw.optionName
                }
            } : {})
        }
    ];
}

function mergeDevicePhotos (current: DBSchemaCompleteDevice, photos: string[] = []): string[] {
    if (!current.url) return photos;

    return photos.includes(current.url) ? photos : [ ...photos, current.url ];
}

function buildNestedObjectFromQuery (raw: DBSchemaCompleteDevice[]): Device {
    return raw.reduce((total, current) => {
        return {
            id: current.deviceId,
            type: {
                id: current.typeId,
                name: current.typeName
            },
            personType: current.personType,
            ...(current.personType === DevicePersonType.COMPANY ? { companyName: current.companyName } : {}),
            ...(current.personType === DevicePersonType.COMPANY ? { nip: current.nip } : {}),
            firstName: current.firstName,
            lastName: current.lastName,
            email: current.email,
            street: current.street,
            streetNumber: current.streetNumber,
            city: current.city,
            postcode: current.postcode,
            bankAccount: current.bankAccount,
            status: current.status,
            comments: current.comments,
            consentTap: current.consentTap,
            consentInfc: current.consentInfc,
            consentDtcl: current.consentDtcl,
            consentPbl: current.consentPbl,
            photos: mergeDevicePhotos(current, total.photos),
            inputs: mergeDeviceInputs(current, total.inputs)
        }
    }, {} as Device);
}

export default {
    method: HTTPMethod.GET,
    url: '/api/devices/:id',
    controller: async (req: Request, res: Response) => {
        const results = await knex('devices').select('*', 'devices.id AS device_id', 'device_types.name AS type_name', 'inputs.name AS input_name', 'inputs.type AS input_type', 'input_options.name AS option_name', 'inputs.id AS input_id')
            .leftJoin('photos', 'devices.id', 'photos.device_id')
            .leftJoin('device_types', 'devices.type_id', 'device_types.id')
            .leftJoin('device_type_inputs', 'devices.type_id', 'device_type_inputs.device_type_id')
            .leftJoin('inputs', 'device_type_inputs.input_id', 'inputs.id')
            .leftJoin('device_data', (join) => {
                join.on('devices.id', 'device_data.device_id').on('inputs.id', 'device_data.input_id')
            })
            .leftJoin('input_options', 'device_data.option_id', 'input_options.id');

        return respondSuccess(res, buildNestedObjectFromQuery(results));
    }
} as APIRoute;
