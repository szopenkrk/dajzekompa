exports.up = (knex) => {
    return knex.schema.createTable('applications', table => {
        table.bigIncrements('id');
        table.enum('person_type', ['PERSON', 'COMPANY']).notNullable();
        table.string('company_name').defaultTo('');
        table.string('nip').defaultTo('');
        table.string('first_name').defaultTo('');
        table.string('last_name').defaultTo('');
        table.string('email').notNullable();
        table.enum('device_type', ['NOTEBOOK', 'DESKTOP']).notNullable();
        table.string('notebook_name').defaultTo('');
        table.string('ram').notNullable();
        table.string('hdd').notNullable();
        table.string('screen_size').notNullable();
        table.boolean('camera').notNullable();
        table.boolean('microphone').notNullable();
        table.boolean('speakers').notNullable();
        table.boolean('monitor').notNullable();
        table.text('comments').defaultTo('');

        table.index(['id']);
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('applications');
};
