/* Models */
import { DBTable, DBSchemaCompleteDevice, DBSchemaInput, DBSchemaDevice, DBSchemaDeviceData, DBSchemaDeviceType } from 'server/model/DB';

/* Application files */
import knex from 'server/database/knex';
import { DevicePersonType, Device, DeviceInputType, DeviceInput, DeviceInputData, DeviceUpsertRequest, DeviceInputRequest, DeviceStatus } from 'common/model/Device';
import APIError from 'server/controller/APIError';
import { HTTPCode } from 'server/model/HTTP';

export async function getCompleteDevice (id: number): Promise<Device> {
    const aliases = [
        `${DBTable.DEVICES}.id AS device_id`,
        `${DBTable.DEVICE_TYPES}.name AS type_name`,
        `${DBTable.INPUTS}.name AS input_name`,
        `${DBTable.INPUTS}.type AS input_type`,
        `${DBTable.INPUT_OPTIONS}.name AS option_name`,
        `${DBTable.INPUTS}.id AS input_id`
    ];

    try {
        const result = await knex(DBTable.DEVICES).select('*', ...aliases)
            .where(`${DBTable.DEVICES}.id`, id)
            .leftJoin(DBTable.PHOTOS, `${DBTable.DEVICES}.id`, `${DBTable.PHOTOS}.device_id`)
            .leftJoin(DBTable.DEVICE_TYPES, `${DBTable.DEVICES}.type_id`, `${DBTable.DEVICE_TYPES}.id`)
            .leftJoin(DBTable.DEVICE_TYPE_INPUTS, `${DBTable.DEVICES}.type_id`, `${DBTable.DEVICE_TYPE_INPUTS}.device_type_id`)
            .leftJoin(DBTable.INPUTS, `${DBTable.DEVICE_TYPE_INPUTS}.input_id`, `${DBTable.INPUTS}.id`)
            .leftJoin(DBTable.DEVICE_DATA, (join) => {
                join.on(`${DBTable.DEVICES}.id`, `${DBTable.DEVICE_DATA}.device_id`).on(`${DBTable.INPUTS}.id`, `${DBTable.DEVICE_DATA}.input_id`)
            })
            .leftJoin(DBTable.INPUT_OPTIONS, `${DBTable.DEVICE_DATA}.option_id`, `${DBTable.INPUT_OPTIONS}.id`) as DBSchemaCompleteDevice[];

        if (!result.length) {
            throw new APIError(`Device with id '${id}' not found.`, HTTPCode.NOT_FOUND);
        }

        return buildNestedDeviceObjectFromQuery(result);
    } catch (error) {
        throw new APIError(`SQL error: ${error.message}`);
    }
}

export async function listDevices () {
    try {
        const result = await knex(DBTable.DEVICES).select('*')
            .leftJoin(DBTable.DEVICE_TYPES, `${DBTable.DEVICES}.type_id`, `${DBTable.DEVICE_TYPES}.id`) as (DBSchemaDevice & DBSchemaDeviceType)[];

        return buildNestedDeviceObjectsFromQuery(result);
    } catch (error) {
        throw new APIError(`SQL error: ${error.message}`);
    }
}

export async function insertCompleteDevice (body: DeviceUpsertRequest, photos: string[] = []): Promise<number> {
    try {
        let device;

        await knex.transaction(async (trx) => {
            const inputData = await trx(DBTable.DEVICE_TYPE_INPUTS)
                .select('*')
                .where('device_type_id', body.type)
                .leftJoin(DBTable.INPUTS, `${DBTable.DEVICE_TYPE_INPUTS}.input_id`, `${DBTable.INPUTS}.id`) as DBSchemaInput[];

            device = await trx(DBTable.DEVICES)
                .insert(buildDeviceQueryFromObject(body))
                .returning('id');

            await trx(DBTable.DEVICE_DATA)
                .insert(buildDeviceInputsQueryFromObject(body.inputs, inputData, device[0]));

            await trx(DBTable.PHOTOS)
                .insert(photos.map((url) => ({
                    deviceId: device[0],
                    url
                })));
        });

        return device[0];
    } catch (error) {
        throw new APIError(`SQL error: ${error.message}`);
    }
}

function mergeDeviceInputs (raw: DBSchemaCompleteDevice, inputs: DeviceInput[] = []): DeviceInputData[] {
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

function buildNestedDeviceObjectFromQuery (raw: DBSchemaCompleteDevice[]): Device {
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

function buildNestedDeviceObjectsFromQuery (raw: (DBSchemaDevice & DBSchemaDeviceType)[]): Device[] {
    return raw.map((r) => ({
        ...r,
        type: {
            id: r.typeId,
            name: r.name
        },
        photos: [],
        inputs: []
    }));
}

function buildDeviceQueryFromObject (body: DeviceUpsertRequest): DBSchemaDevice {
    return {
        id: null,
        typeId: body.type,
        personType: body.personType,
        companyName: body.companyName,
        nip: body.nip,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        street: body.street,
        streetNumber: body.streetNumber,
        city: body.city,
        postcode: body.postcode,
        bankAccount: body.bankAccount,
        status: DeviceStatus.RECEIVED,
        comments: body.comments,
        consentTap: body.consentTap,
        consentInfc: body.consentInfc,
        consentDtcl: body.consentDtcl,
        consentPbl: body.consentPbl
    };
}

function buildDeviceInputsQueryFromObject (inputs: DeviceInputRequest[], schema: DBSchemaInput[], deviceId: number): DBSchemaDeviceData[] {
    inputs = inputs.filter((input) => schema.findIndex((i) => i.id === input.id) !== -1);

    return inputs.map((input) => {
        const type = schema.find((s) => s.id === input.id);
        const selectable = [ DeviceInputType.RADIO, DeviceInputType.CHECKBOX ].includes(type.type);

        if (selectable && !input.option || !selectable && !input.value) {
            const message = `Input '${type.name}' (id: ${type.id}) is of type '${type.type}' but corresponding field (value/option) was not provided.`;
            throw new APIError(message, HTTPCode.BAD_REQUEST);
        }

        return {
            deviceId,
            inputId: input.id,
            ...(selectable ? { optionId: input.option } : {}),
            ...(!selectable ? { value: input.value } : {})
        };
    });
}
