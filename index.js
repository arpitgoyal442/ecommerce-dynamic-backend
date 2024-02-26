const express = require("express")
require('dotenv').config();

const cors=require('cors')

const  router = require("./src/api/router.js")
const bodyParser =require("body-parser")



const app=express();

app.use(cors())

app.use(bodyParser.json());
app.use("/",router)

app.listen(9001,()=>{

    console.log("App is listening at port 9001")
})

