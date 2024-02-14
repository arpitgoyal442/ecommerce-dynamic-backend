const {Router} =require("express");
const { getAllProducts, addProduct, updateProduct, deleteProduct } = require("./controller");
const sendResponse = require("../../middleware/response");

const {upload} = require("../../configs/multer.js");
const {uploadFilesToAWS } = require("../../middleware/uploadFilesToAWS.js");
// const  = require("../../middleware/uploadFilesToAWS.js");

const router=new Router();

router.get("/",getAllProducts,sendResponse)


router.post("/",upload.fields([{name:'productImages'}]),uploadFilesToAWS,addProduct,sendResponse)

router.put("/:productId",updateProduct,sendResponse)


router.delete("/:productId",deleteProduct,sendResponse)

module.exports=router