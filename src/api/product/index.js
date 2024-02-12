const {Router} =require("express");
const { getAllProducts, addProduct, updateProduct, deleteProduct } = require("./controller");
const sendResponse = require("../../middleware/response");

const router=new Router();

router.get("/",getAllProducts,sendResponse)


router.post("/",addProduct,sendResponse)

router.put("/:productId",updateProduct,sendResponse)


router.delete("/:productId",deleteProduct,sendResponse)

module.exports=router