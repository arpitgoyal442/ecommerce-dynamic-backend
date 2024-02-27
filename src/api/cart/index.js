const {Router}=require('express');
const { getCartItems, updateCart } = require('./controller');
const sendResponse = require('../../middleware/response');

const router=new Router();


router.get("/:userId",getCartItems);
router.post("/:userId",updateCart,sendResponse)

module.exports=router