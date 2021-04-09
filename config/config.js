require('dotenv').config();

const creds = {
    development: {
        username: process.env.DB_USERNAME || "developer",
        password: process.env.DB_PASSWORD || 123456,
        database: process.env.DB_NAME || "trello",
        host: process.env.DB_HOSTNAME || "127.0.0.1",
        port: process.env.DB_PORT || "5432",
        dialect: process.env.DB_DIALECT || "postgres",
        logging: false,
    },
    test: {
      username: process.env.DB_USERNAME || "developer",
      password: process.env.DB_PASSWORD || 123456,
      database: "trello_test",
      host: process.env.DB_HOSTNAME || "127.0.0.1",
      port: process.env.DB_PORT || "5432",
      dialect: process.env.DB_DIALECT || "postgres",
      logging: false,
    },
    production: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOSTNAME,
      port: process.env.DB_PORT,
      dialect: process.env.DB_DIALECT,
      logging: false,
    },
};

module.exports = creds;
