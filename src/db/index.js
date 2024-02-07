const { Pool } = require("pg");



const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ecommerce',
    password: 'postgres',
    port: 5432,
    max: 20,
    min: 4
});

module.exports = {
    pool,
    query: (text, params) => pool.query(text, params),
    end: () => pool.end(),   // Releasing the client back to pool so that other queries can use it
};