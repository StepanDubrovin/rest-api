import type {Knex} from  'knex';
import 'dotenv/config';


const config: {[key: string]:  Knex.Config} = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT): 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    pool: {
      min: process.env.DB_MIN ? parseInt(process.env.DB_MIN): 2,
      max: process.env.DB_MAX ? parseInt(process.env.DB_MAX): 50,
      idleTimeoutMillis: process.env.DB_TIMEOUTMILLIS ? parseInt(process.env.DB_TIMEOUTMILLIS): 20000,
    },
    migrations: {
      directory: './migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};

export default config;