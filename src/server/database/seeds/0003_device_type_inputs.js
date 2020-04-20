exports.seed = async (knex) => {
    return knex('device_type_inputs').insert([
        { deviceTypeId: 1, inputId: 1 },
        { deviceTypeId: 1, inputId: 2 },
        { deviceTypeId: 1, inputId: 3 },
        { deviceTypeId: 1, inputId: 4 },
        { deviceTypeId: 1, inputId: 5 },
        { deviceTypeId: 2, inputId: 2 },
        { deviceTypeId: 2, inputId: 3 },
        { deviceTypeId: 2, inputId: 4 },
        { deviceTypeId: 3, inputId: 5 }
    ]);
};
