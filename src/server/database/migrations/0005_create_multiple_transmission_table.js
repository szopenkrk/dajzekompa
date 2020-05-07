exports.up = (knex) => {
    return knex.schema.createTable('transmissions', table => {
        table.string('company_name').notNullable();
        table.string('email').defaultTo('');
        table.integer('device_number').notNullable();
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('transmissions');
};
