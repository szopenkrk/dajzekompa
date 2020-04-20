const statuses = ['RECEIVED', 'SENT_TO_SERVICE', 'IN_SERVICE', 'SERVICE_COMPLETE', 'SENT_TO_RECIPIENT', 'COMPLETE'];

exports.up = (knex) => {
    return knex.schema.createTable('input_options', table => {
        table.increments('id').primary();
        table.integer('input_id').notNullable();

        table.enum('type', ['TEXT', 'RADIO', 'CHECKBOX', 'DROPDOWN']).notNullable();
        table.string('name').notNullable();

        table.index(['id']);
        table.unique(['id'], 'input_options_id_unique');
        table.foreign('input_id').references('id').inTable('inputs');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('input_options');
};
