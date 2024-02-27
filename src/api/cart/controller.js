const { CART_TBL } = require("../../constant/constant");
const db = require("../../db");
const {  updateQuery, deleteQuery } = require("../../helper/queryhelper");

const getCartItems=async(req,res,next)=>{
    try{
        let userId=req.params.userId;

        let qry={
            text:`SELECT  
                    p.*,c.quantity,
                    pt.product_type_name,
                    jsonb_object_agg(a.attribute_name,pa.attribute_value) AS attributes
                    FROM products p
                    JOIN
                    cart c on c.product_id=p.product_id
                    JOIN
                    product_types pt ON p.product_type_id = pt.product_type_id
                    JOIN
                    product_attributes pa ON p.product_id = pa.product_id
                    JOIN
                    attributes a ON pa.attribute_id = a.attribute_id where c.user_id=$1 GROUP BY
                    p.product_id, p.product_name, pt.product_type_name ,c.quantity`,
             values:[userId]
        }

        let result= await db.query(qry);

        res.send(result.rows)

    }catch(e){
        req.error=e;
        next();
    }

}


const updateCart=async(req,res,next)=>{

    try{
        let userId=req.params.userId*1;
        const {product_id , quantity}=req.body
        let qry;

        // if only product_id   --- Add to Cart with qty=1
        if(quantity==null)
        {
            // Insert if Not already present in db
           qry={
                 text:`Insert into ${CART_TBL}(user_id,product_id,quantity) values($1,$2,$3) 
                  ON CONFLICT(user_id,product_id) DO NOTHING`,
                 values:[userId,product_id,1]
                }
        }


        //  if product_id  && qty  --- Update  product qty
         else{
            let condtn={
                user_id:userId,
                product_id:product_id
            }
            if(quantity!=0)
            qry=updateQuery(CART_TBL,{quantity:quantity},condtn)

            // if product_id && qty==0    ---Remove product from that cart
            else
            qry=deleteQuery(CART_TBL,condtn)
        }

        console.log("Query---");
        console.log(qry)

        let result=await db.query(qry);
        console.log(result)

        req.data={
            qry:result.command,
            rowCount:result.rowCount
        }
        next();

    }catch(e){
        console.log(e)
        req.error=e;
        next();
    }
}


module.exports={

    getCartItems,
    updateCart
}