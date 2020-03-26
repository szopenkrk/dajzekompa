const path = require('path');
const { knexSnakeCaseMappers } = require('objection');

module.exports = {
    local: {
        client: 'pg',
        connection: 'postgres://postgres:postgres@127.0.0.1:5432/projektmiasto',
        migrations: {
            directory: path.resolve(__dirname, 'src/server/database/migrations')
        },
        ...knexSnakeCaseMappers()
    },
    development: {
        client: 'pg',
        connection: 'postgres://postgres:projektmiasto2020@dev.dajzekompa.pl:6432/projektmiasto',
        migrations: {
            directory: path.resolve(__dirname, 'src/server/database/migrations')
        },
        ...knexSnakeCaseMappers()
    }
};
