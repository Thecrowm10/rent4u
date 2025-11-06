var mysql=require("mysql");

var connection = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"rent4u",
    multipleStatements: true
});
module.exports=connection;