const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "54321",
    host: "localhost",
    port: 5432,
    database: "projectGym"
});

module.exports = pool;