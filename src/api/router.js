const { Router } = require("express");

const productRouter=require("../api/product/index.js")
const productTypeRouter=require("../api/productType/index.js")
const cartRouter=require("../api/cart/index.js")


const router=new Router();

router.use("/product",productRouter)
router.use("/product-types",productTypeRouter)
router.use("/cart",cartRouter)


module.exports=router;