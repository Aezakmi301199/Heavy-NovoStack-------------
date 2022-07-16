// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

 import { dirname } from 'path';
 import { fileURLToPath } from 'url';
 import * as path from 'path';
 const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  development: {
    client: 'postgresql',
    connection: {
      database: 'heavy',
      user:     'postgres',
      password: 'admin'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory:'./migrations'
    },
    seeds: {
      directory:'./seeds'
  }
  }

/*
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

*/

};
