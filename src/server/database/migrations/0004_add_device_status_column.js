const statuses = ['RECEIVED', 'SENT_TO_SERVICE', 'IN_SERVICE', 'SENT_TO_RECIPIENT', 'COMPLETE'];

exports.up = (knex) => {
    return knex.schema.alterTable('applications', table => {
        table.enum('status', statuses).notNullable().defaultTo('RECEIVED');
    });
};

exports.down = (knex) => {
    return knex.schema.alterTable('applications', table => {
        table.dropColumn('status');
    });
};
