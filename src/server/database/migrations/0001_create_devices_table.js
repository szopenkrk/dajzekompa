const statuses = ['RECEIVED', 'SENT_TO_SERVICE', 'IN_SERVICE', 'SENT_TO_RECIPIENT', 'COMPLETE'];

exports.up = (knex) => {
    return knex.schema.createTable('devices', table => {
        table.bigIncrements('id');
        table.enum('person_type', ['PERSON', 'COMPANY']).notNullable();
        table.string('company_name').defaultTo('');
        table.string('nip').defaultTo('');
        table.string('first_name').defaultTo('');
        table.string('last_name').defaultTo('');
        table.string('street').notNullable();
        table.string('street_number').notNullable();
        table.string('city').notNullable();
        table.string('postcode').notNullable();
        table.string('email').notNullable();
        table.enum('device_type', ['NOTEBOOK', 'DESKTOP']).notNullable();
        table.enum('status', statuses).notNullable().defaultTo('RECEIVED');
        table.string('notebook_name').defaultTo('');
        table.float('ram', 2).notNullable();
        table.float('hdd', 2).notNullable();
        table.float('screen_size', 2).notNullable();
        table.boolean('camera').notNullable();
        table.boolean('microphone').notNullable();
        table.boolean('speakers').notNullable();
        table.boolean('monitor').notNullable();
        table.text('comments').defaultTo('');

        table.index(['id']);
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('devices');
};