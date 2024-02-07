const { Router } = require("express");

const productRouter=require("../api/product/index.js")


const router=new Router();

router.use("/product",productRouter)


module.exports=router;