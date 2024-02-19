const {Router} =require("express");

const sendResponse = require("../../middleware/response.js");
const { getProductTypes } = require("./controller");


// const  = require("../../middleware/uploadFilesToAWS.js");

const router=new Router();
router.get("/",getProductTypes,sendResponse)




module.exports=router