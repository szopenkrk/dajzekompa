const path = require('path');
const { knexSnakeCaseMappers } = require('objection');

module.exports = {
    local: {
        client: 'pg',
        connection: 'postgres://postgres:postgres@127.0.0.1:5432/dajzekompa',
        migrations: {
            directory: path.resolve(__dirname, 'src/server/database/migrations')
        },
        ...knexSnakeCaseMappers()
    },
    development: {
        client: 'pg',
        connection: 'postgres://postgres:dajzekompa2020@dev.dajzekompa.pl:6432/dajzekompa',
        migrations: {
            directory: path.resolve(__dirname, 'src/server/database/migrations')
        },
        ...knexSnakeCaseMappers()
    }
};
