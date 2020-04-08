exports.up = (knex) => {
    return knex.schema.createTable('assignments', table => {
        table.bigInteger('receiver_id');
        table.bigInteger('device_id');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('assignments');
};
