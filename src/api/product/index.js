const {Router} =require("express");
const { getAllProducts, addProduct } = require("./controller");
const sendResponse = require("../../middleware/response");

const router=new Router();

router.get("/",getAllProducts,sendResponse)


router.post("/",addProduct,sendResponse)

module.exports=router