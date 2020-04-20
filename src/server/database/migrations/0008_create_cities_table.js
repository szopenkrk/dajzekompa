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
        table.increments('id').primary();
        table.string('city');
        table.enum('region', regions);

        table.index(['id']);
        table.unique(['id'], 'cities_id_unique');
        table.unique(['city', 'region'], 'city_unique_city_region');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('cities');
};
