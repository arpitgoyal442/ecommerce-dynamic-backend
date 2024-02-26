const { CART_TBL } = require("../../constant/constant");
const db = require("../../db");
const { selectQuery } = require("../../helper/queryhelper");




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

        db.query(qry)

    }catch(e){
        req.error=e;
        next();
    }

}


const updateCart=async()=>{


    // if only product_id   --- Add to Cart with qty=1
    //  if product_id  && qty  --- Update  product qty
   // if product_id && qty==0    ---Remove product from that cart
}