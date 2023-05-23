const mariadb = require('mariadb');
require("dotenv").config({ path: "./db/.env" });

const connection = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    connectionLimit: 30
};

const pool = mariadb.createPool(connection);

async function executeQuery(query) {
    let conn;
    try {
        conn = await pool.getConnection();
        return await conn.query(query);
    } catch (exception) {
        console.log(exception);
        return exception.text;
    } finally {
        if (conn) conn.release();
    }
}


async function executeMultipleQueries(queries) {
    let conn;
    try {
        conn = await pool.getConnection();
        for (let query of Object.values(queries)) {
            await conn.query(query);
        }
        return "Complete";
    } catch (exception) {
        console.log(exception);
        return exception.text;
    } finally {
        if (conn) {
            conn.release();
        }
    }
}

async function getConnection() {
    return pool.getConnection();
}

module.exports = {
    executeQuery,
    executeMultipleQueries,
    getConnection
};
