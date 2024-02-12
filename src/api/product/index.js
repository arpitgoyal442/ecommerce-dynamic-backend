const {Router} =require("express");
const { getAllProducts, addProduct, updateProduct } = require("./controller");
const sendResponse = require("../../middleware/response");

const router=new Router();

router.get("/",getAllProducts,sendResponse)


router.post("/",addProduct,sendResponse)

router.put("/",updateProduct,sendResponse)

module.exports=router