

const sendResponse=(req,res)=>{

    try{
        const {data={},status=200,error}=req
        
        if(error)
        throw new Error(error.message || 'Internal server Error')
        res.status(status).send(data);
        }
      
        catch(e){
      
          console.log("Error in sendResponse Middleware",e);
          res.status(500).send({
            error:{message:'Internal Server Error'}
          })
        }


}

module.exports=sendResponse