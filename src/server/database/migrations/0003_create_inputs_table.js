const statuses = ['RECEIVED', 'SENT_TO_SERVICE', 'IN_SERVICE', 'SERVICE_COMPLETE', 'SENT_TO_RECIPIENT', 'COMPLETE'];

exports.up = (knex) => {
    return knex.schema.createTable('inputs', table => {
        table.increments('id').primary();

        table.string('name').notNullable();
        table.enum('type', ['TEXT', 'RADIO', 'CHECKBOX', 'DROPDOWN']).notNullable();

        table.index(['id']);
        table.unique(['id'], 'inputs_id_unique');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('inputs');
};
