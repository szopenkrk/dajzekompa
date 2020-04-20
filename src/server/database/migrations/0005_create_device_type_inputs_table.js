exports.up = (knex) => {
    return knex.schema.createTable('device_type_inputs', table => {
        table.integer('device_type_id').notNullable();
        table.integer('input_id').notNullable();

        table.foreign('device_type_id').references('id').inTable('device_types');
        table.foreign('input_id').references('id').inTable('inputs');
        table.unique(['device_type_id', 'input_id'], 'device_type_inputs_id_unique');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('device_type_inputs');
};
