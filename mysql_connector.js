var mysql = require("mysql");

// Code ab password yahaan se padhega
var connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
    ssl: {
        rejectUnauthorized: false 
    }
});

module.exports = connection;