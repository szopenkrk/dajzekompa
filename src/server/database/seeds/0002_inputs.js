exports.seed = async (knex) => {
    return knex('inputs').insert([
        { name: 'notebook_name', type: 'TEXT' },
        { name: 'cpu', type: 'TEXT' },
        { name: 'ram', type: 'TEXT' },
        { name: 'hdd', type: 'TEXT' },
        { name: 'screen_size', type: 'TEXT' }
    ]);
};
