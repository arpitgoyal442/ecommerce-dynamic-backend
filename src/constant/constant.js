const PRODUCT_TBL='products'
const PRODUCT_TYPES_TBL='product_types'

const PRODUCT_ATTR_TBL='product_attributes'

const ATTRIBUTES_TBL='attributes'


const TABLE_COLS={

    products:['product_id','product_name','product_type_id','price','description','product_images','stock','sale']
}

const ITEM_PER_PAGE=2




module.exports={PRODUCT_TBL,PRODUCT_ATTR_TBL,PRODUCT_TYPES_TBL,ATTRIBUTES_TBL,TABLE_COLS,ITEM_PER_PAGE}