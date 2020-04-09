exports.up = (knex) => {
    return knex.schema.createTable('users', table => {
        table.bigIncrements('id');
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();

        table.index(['id']);
        table.unique(['email']);
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('users');
};
