const { PRODUCT_TYPES_TBL, ATTRIBUTES_TBL } = require("../../constant/constant");
const db = require("../../db");

const getProductTypes = async (req, res, next) => {

    try {
        let query = {

            text: `select pt.product_type_id, pt.product_type_name , ARRAY_AGG (att.attribute_name) fields
                  from ${PRODUCT_TYPES_TBL} as pt left join  ${ATTRIBUTES_TBL} as att
                  on  pt.product_type_id=att.product_type_id 
                  group by   pt.product_type_name,pt.product_type_id`,

             values:[]
        }

       let result=await db.query(query);
       req.data=result.rows;
       next();

    } catch (e) {
        req.error = e;
        next();
    }
}

module.exports = { getProductTypes }