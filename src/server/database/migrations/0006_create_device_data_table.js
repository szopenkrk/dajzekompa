exports.up = (knex) => {
    return knex.schema.createTable('device_data', table => {
        table.integer('device_id').notNullable();
        table.integer('input_id').notNullable();

        table.integer('option_id');
        table.string('value');

        table.unique(['device_id', 'input_id'], 'device_data_device_id_input_id_unique');
        table.foreign('device_id').references('id').inTable('devices');
        table.foreign('input_id').references('id').inTable('inputs');
        table.foreign('option_id').references('id').inTable('input_options');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('device_data');
};
