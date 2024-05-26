const express=require('express')
const app=express()
const cors=require('cors')
// const session=require('express-session')
const bodyParser = require("body-parser");
const router=require('./routes/router')



var corsOptions = {
    origin: 'http://localhost:5173',
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))


//for upload file
app.use(express.static('upload'))


//this is middleWare use to encode the form&body request value //example req.body from form
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())


//require the db connection
require('./db/conn.js')

//middleware for the router
app.use('/api',router)

app.listen(5000,()=>{
    console.log('port is listening')
})