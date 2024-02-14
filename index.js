const express = require("express")
require('dotenv').config();

const  router = require("./src/api/router.js")
const bodyParser =require("body-parser")



const app=express();

app.use(bodyParser.json());
app.use("/",router)

app.listen(9000,()=>{

    console.log("App is listening at port 9000")
})

