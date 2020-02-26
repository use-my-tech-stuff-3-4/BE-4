require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  testing: {
    client: 'pg',
    useNullAsDefault: true,
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }

};
