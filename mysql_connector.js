var mysql=require("mysql");

var connection = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"rent",
    multipleStatements: true
});
module.exports=connection;