exports.up = (knex) => {
    return knex.schema.alterTable('receivers', table => {
        table.string('locker').notNullable();
    });
};

exports.down = (knex) => {
    return knex.schema.alterTable('receivers', (table) => {
        table.dropColumn('locker');
    });
};
