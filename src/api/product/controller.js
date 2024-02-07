
const { PRODUCT_TBL, DB_TABLES_COLS } = require("../../constant/constant");
const db=require("../../db")

const _=require("lodash");
const { insertObjectQuery } = require("../../helper/queryhelper");

const getAllProducts=async (req,res,next)=>{

    try{

       let query={

        text:`Select * from product ${PRODUCT_TBL}`,
        values:[]
       }
       let data= await db.query(query)
       req.data=data.rows;
       next()
    }

    catch(e){
        console.log(e)
        req.error=e;
        next();

    }

}

const addProduct=async (req,res,next)=>{
    let client=await db.pool.connect();
    try{
        client.query('BEGIN')
        let  commonAttr=_.pick(req.body,DB_TABLES_COLS['product']);
        let query1=insertObjectQuery(PRODUCT_TBL,commonAttr)

        await db.query(query1)
        // Common Attr Goes to product Table 
        let product_type=req.body?.product_type || "";

        let specialAttr=null;
         if(DB_TABLES_COLS[product_type])
         {
          
            specialAttr=_.pick(req.body,DB_TABLES_COLS[product_type]);
            let SPECIAL_TBL=product_type
            let query2= insertObjectQuery(SPECIAL_TBL,specialAttr);
            await db.query(query2)
         }
         await client.query("COMMIT")
        next();


    }catch(e){

        console.log(e)
        await client.query("ROLLBACK")
        req.error=e;
        next();

    }finally{
        req.data={message:"Product Inserted Successfully"}
        client.release();
        next();
    }


}

module.exports={getAllProducts,addProduct}