import { Dialect, Sequelize } from 'sequelize';

const { DB_NAME, DB_USER, DB_HOST, DB_PORT, DB_PASSWORD, DB_DRIVER } = process.env;

const connection = new Sequelize({
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: Number(DB_PORT),
    dialect: DB_DRIVER as Dialect,
    // logging: false, // ???
});

export { connection };