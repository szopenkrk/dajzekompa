const path = require('path');
const { knexSnakeCaseMappers } = require('objection');

module.exports = {
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'projektmiasto-db',
        database: 'projektmiasto',
        charset: 'utf8'
    },
    migrations: {
        directory: path.resolve(__dirname, 'src/server/database/migrations')
    },
    ...knexSnakeCaseMappers()
};
