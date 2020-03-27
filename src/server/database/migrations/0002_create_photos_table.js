exports.up = (knex) => {
    return knex.schema.createTable('photos', table => {
        table.bigIncrements('id');
        table.bigInteger('application_id').notNullable();
        table.string('url').notNullable();

        table.index(['id']);
        table.foreign('application_id').references('applications.id');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('photos');
};
