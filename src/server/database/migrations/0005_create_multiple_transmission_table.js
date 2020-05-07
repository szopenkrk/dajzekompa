exports.up = (knex) => {
    return knex.schema.createTable('transmissions', table => {
        table.string('company_name').defaultTo('');
        table.string('email').defaultTo('');
        table.float('device_number', 2).notNullable();
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('transmissions');
};