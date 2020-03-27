exports.up = (knex) => {
    return knex.schema.createTable('receivers', table => {
        table.bigIncrements('id');
        table.bigInteger('application_id').notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable();

        table.index(['id']);
        table.foreign('application_id').references('applications.id');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('receivers');
};
