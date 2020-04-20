exports.up = (knex) => {
    return knex.schema.createTable('device_types', table => {
        table.increments('id').primary();

        table.string('name').notNullable();

        table.index(['id']);
        table.unique(['id'], 'device_types_id_unique');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('device_types');
};
