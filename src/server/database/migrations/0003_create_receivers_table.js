exports.up = (knex) => {
    return knex.schema.createTable('receivers', table => {
        table.bigIncrements('id');
        table.enum('person_type', [ 'STUDENT', 'TEACHER' ]);
        table.string('first_name').defaultTo('');
        table.string('last_name').defaultTo('');
        table.string('street').notNullable();
        table.string('street_number').notNullable();
        table.string('city').notNullable();
        table.string('postcode').notNullable();
        table.string('email').notNullable();
        table.string('phone').notNullable();
        table.string('locker').notNullable();
        table.string('school').notNullable();
        table.string('grade').defaultTo('');
        table.boolean('complete').defaultTo(false);

        table.index(['id']);
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('receivers');
};
