const regions = [
    'ZACHODNIO_POMORSKIE',
    'POMORSKIE',
    'WARMINSKO_MAZURSKIE',
    'PODLASKIE',
    'KUJAWSKO_POMORSKIE',
    'WIELKOPOLSKIE',
    'MAZOWIECKIE',
    'LUBUSKIE',
    'LODZKIE',
    'LUBELSKIE',
    'SWIETOKRZYSKIE',
    'DOLNOSLASKIE',
    'OPOLSKIE',
    'SLASKIE',
    'MALOPOLSKIE',
    'PODKARPACKIE'
];

exports.up = (knex) => {
    return knex.schema.createTable('cities', table => {
        table.bigIncrements('id');
        table.string('city');
        table.enum('region', regions);

        table.index(['id']);
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('cities');
};
