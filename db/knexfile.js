const { knexSnakeCaseMappers } = require('objection')
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'ems_development',
      user:     'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds',
    },
    ...knexSnakeCaseMappers,
  },
};
