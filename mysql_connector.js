var mysql = require("mysql");

var connection = mysql.createPool({
    host: "gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
    port: 4000, // TiDB uses port 4000
    user: "u3Hu4P8W7VT8pk1.root",
    password: "pvnvl2VAxa30rM37",
    database: "test", // TiDB's default database is 'test'
    multipleStatements: true, // This is from your original file
    ssl: {
        // This is required for TiDB Cloud to connect
        rejectUnauthorized: false 
    }
});

module.exports = connection;