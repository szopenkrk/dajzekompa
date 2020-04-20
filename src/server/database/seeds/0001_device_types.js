exports.seed = async (knex) => {
    return knex('device_types').insert([
        { name: 'notebook' },
        { name: 'desktop' },
        { name: 'monitor' }
    ]);
};
