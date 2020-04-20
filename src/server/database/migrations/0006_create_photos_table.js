exports.up = (knex) => {
    return knex.schema.createTable('photos', table => {
        table.increments('id').primary();
        table.integer('device_id').notNullable();
        table.string('url').unique().notNullable();

        table.index(['id']);
        table.unique(['id'], 'photos_id_unique');
        table.foreign('device_id').references('id').inTable('devices');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('photos');
};
