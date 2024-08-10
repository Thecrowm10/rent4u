const express=require('express')
const myrouter=require('./route')
const bodyParser = require('body-parser')
const app=express()
app.set('view engine','ejs')
const port=2002
app.use(bodyParser.urlencoded({extended:false}));
app.use("/static",express.static(__dirname+"/static"))
app.use('/',myrouter)
app.get('',myrouter)
app.listen(port,()=>
{
console.log(`http://localhost:${port}`)
})