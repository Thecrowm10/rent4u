const express=require('express')
const router=express.Router()
const mysql_connect=require("./mysql_connector")
const connection = require('./mysql_connector')
router.get("/",(req,res)=>
    {
        res.render("index")
        res.end()
    }
    )
    module.exports = router;