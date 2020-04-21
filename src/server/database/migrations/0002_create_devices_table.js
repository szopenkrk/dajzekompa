const statuses = ['RECEIVED', 'SENT_TO_SERVICE', 'IN_SERVICE', 'SERVICE_COMPLETE', 'SENT_TO_RECIPIENT', 'COMPLETE'];

exports.up = (knex) => {
    return knex.schema.createTable('devices', table => {
        table.increments('id').primary();
        table.integer('type_id').notNullable();

        table.enum('person_type', ['PERSON', 'COMPANY']).notNullable();
        table.string('company_name').defaultTo('');
        table.string('nip').defaultTo('');
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable();
        table.string('street').notNullable();
        table.string('street_number').notNullable();
        table.string('city').notNullable();
        table.string('postcode').notNullable();
        table.string('bank_account').notNullable();
        table.enum('status', statuses).notNullable().defaultTo(statuses[0]);
        table.text('comments').defaultTo('');

        table.integer('consentTap').notNullable();
        table.integer('consentInfc').notNullable();
        table.integer('consentDtcl').notNullable();
        table.integer('consentPbl');

        table.index(['id']);
        table.unique(['id'], 'devices_id_unique');
        table.foreign('type_id').references('id').inTable('device_types');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('devices');
};
