/* Libraries */
import knex from 'knex';
import { knexSnakeCaseMappers } from 'objection';

/* Application files */
import Config from '../lib/config';

export default knex({
    client: 'pg',
    connection: Config.DB_URL,
    ...knexSnakeCaseMappers()
});
