exports.up = (knex) => {
    return knex.schema.createTable('input_options', table => {
        table.increments('id').primary();
        table.integer('input_id').notNullable();

        table.string('name').notNullable();

        table.index(['id']);
        table.unique(['id'], 'input_options_id_unique');
        table.foreign('input_id').references('id').inTable('inputs');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('input_options');
};
