const inputTypes = ['TEXT', 'RADIO', 'CHECKBOX', 'DROPDOWN'];

exports.up = (knex) => {
    return knex.schema.createTable('inputs', table => {
        table.increments('id').primary();

        table.string('name').notNullable();
        table.enum('type', inputTypes).notNullable();

        table.index(['id']);
        table.unique(['id'], 'inputs_id_unique');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('inputs');
};
