
const { PRODUCT_TBL, PRODUCT_TYPES_TBL, PRODUCT_ATTR_TBL, ATTRIBUTES_TBL, TABLE_COLS } = require("../../constant/constant");
const db = require("../../db")

const _ = require("lodash");
const { insertObjectQuery, selectQuery, updateQuery } = require("../../helper/queryhelper");

const getAllProducts = async (req, res, next) => {

    try {
        let query = {
            text: `SELECT
        p.*,
        pt.product_type_name,
        jsonb_object_agg(a.attribute_name,pa.attribute_value) AS attributes
    FROM ${PRODUCT_TBL} p
    JOIN
        ${PRODUCT_TYPES_TBL} pt ON p.product_type_id = pt.product_type_id
    JOIN
        ${PRODUCT_ATTR_TBL} pa ON p.product_id = pa.product_id
    JOIN
        ${ATTRIBUTES_TBL} a ON pa.attribute_id = a.attribute_id
    GROUP BY
        p.product_id, p.product_name, pt.product_type_name;`,
            values: []
        }
        let data = await db.query(query)
        req.data = data.rows;
        next()
    }
    catch (e) {
        console.log(e)
        req.error = e;
        next();
    }

}

const addProduct = async (req, res, next) => {


    let client=await db.pool.connect();
    try {
        await  client.query('BEGIN')
        let productAttr = _.pick(req.body, TABLE_COLS.products)

        let q = insertObjectQuery(PRODUCT_TBL, productAttr)

        let result1 = await client.query(q)
        let product_id = result1.rows[0].product_id


        //fethc other attributes of this category(if any)
        let query = {
            text: `SELECT attribute_id,attribute_name from ${ATTRIBUTES_TBL} where product_type_id=$1`,
            values: [productAttr.product_type_id]
        }

        let otherAttrRes = await client.query(query)
        const otherAttr = otherAttrRes.rows
        const otherattributeArray = otherAttrRes.rows.map(item => item.attribute_name);

        let otherAttributes = _.pick(req.body, otherattributeArray)

        let promises = [];

        for (let i = 0; i < otherAttr.length; i++) {
            let attr_id = otherAttr[i].attribute_id
            let attr_value = otherAttributes[otherAttr[i].attribute_name]

            let q = {
                text: `Insert into ${PRODUCT_ATTR_TBL}(product_id,attribute_id,attribute_value) values($1,$2,$3)`,
                values: [product_id, attr_id, attr_value]
            }
            promises.push(client.query(q))
        }
           await  Promise.all(promises)
           await client.query("COMMIT")
            res.send({ success: true });
    } catch (e) {
        console.log(e)
        await client.query("ROLLBACK")
        req.error = e;
        next();

    } finally{
        client.release()
    }


}

const updateProduct=async(req,res,next)=>{

    let client= await db.pool.connect()

    try{
         await client.query("BEGIN")
    //  In Body have I Have 2 kind of Attributes 

    // Some are of products Table
    let productsAttr=_.pick(req.body , TABLE_COLS.products);

    let productId=productsAttr.product_id;

    // Update products tabel and insert these productsAttr there 

    let updateProductsQry=updateQuery(PRODUCT_TBL,productsAttr,{product_id:productId})

    let result1= await  client.query(updateProductsQry)


    console.log("Result 1 is ---");
    console.log(result1)

    console.log("updateProductsQry--");
    console.log(updateProductsQry)

    




    // Some attributes are  in attributes table (where product_type= req.body.product_type)

    // Fetch other attributes

    let qry2=selectQuery(ATTRIBUTES_TBL,['*'],{product_type_id:productsAttr.product_type_id});


    console.log("qry2",qry2)

    let result= await  client.query(qry2)
    const otherAttr = result.rows

    const otherattributeArray = result.rows.map(item => item.attribute_name);

    let otherAttributes = _.pick(req.body, otherattributeArray)

    console.log("other Attr--");
    console.log(otherAttr);
    // [
    //     { attribute_id: 1, product_type_id: 1, attribute_name: 'Size' },
    //     { attribute_id: 2, product_type_id: 1, attribute_name: 'Color' }
    //   ]

    console.log("otherattributeArray---");  
    console.log(otherattributeArray);     // [ 'Size', 'Color' ]

    console.log("otherAttributes--");
    console.log(otherAttributes)      // { Size: [ 'L', 'M' ], Color: [ 'Red', 'yello', 'Blue' ] }



    // 
    let promises = [];

    for (let i = 0; i < otherAttr.length; i++) {

        let attr_id = otherAttr[i].attribute_id
        let attr_value = otherAttributes[otherAttr[i].attribute_name]


        let q= updateQuery(PRODUCT_ATTR_TBL,{attribute_value:attr_value},{product_id:productId,attribute_id:attr_id})

        console.log("Q is ")
        console.log(q)

       
        promises.push(client.query(q))
    }
       await  Promise.all(promises)

    
       await client.query('COMMIT')

    res.send(otherAttributes)

    }catch(e){

        console.log(e)
        await client.query("ROLLBACK")
        req.error = e;
        next();

    }finally{

        client.release()

    }





    



}

module.exports = { getAllProducts, addProduct,updateProduct }