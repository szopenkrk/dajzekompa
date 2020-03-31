exports.up = (knex) => {
    return knex.schema.createTable('photos', table => {
        table.bigIncrements('id');
        table.bigInteger('device_id').notNullable();
        table.string('url').notNullable();

        table.index(['id']);
        table.foreign('device_id').references('devices.id');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('photos');
};
