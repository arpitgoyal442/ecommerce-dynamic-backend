const { s3 } = require("../configs/aws");

const fs=require('fs')



const uploadHelper= async (req)=>{


    try{

    let keys=Object.keys(req.files);
    req.awsUrls={}


    const uploadPromises = [];

    for(let i=0;i<keys.length;i++){



        req.awsUrls[keys[i]]=[];
        let files=req.files[keys[i]];

        for(let j=0;j<files.length;j++){

            let file=files[j];
            const fileStream=fs.createReadStream(file.path)

            const params = {
                Bucket: process.env.BUCKETNAME,
                Key: file.fieldname+"/"+file.filename, 
                Body: fileStream,  
                ContentType: file.mimetype,  
              };


              const uploadPromise=new Promise((resolve,reject)=>{


                s3.upload(params, (err, data) => {
                    if (err) {
                      console.error(err);
                      reject(err)
                    
                    } else {
                    //     console.log("Image uploaded to AWS---")
                    //   console.log('Image uploaded successfully:', data);
    
                    
                      req.awsUrls[keys[i]].push(data.Location)
                      resolve();
                    }
                  }
                  
                  );


              })


              uploadPromises.push(uploadPromise)
              
               
        }
    }


    await Promise.all(uploadPromises)
}catch(e){

}



}

const uploadFilesToAWS=async (req,res,next)=>{
    let keys=Object.keys(req.files);
    req.awsUrls={}

    // console.log(req.files)

    const uploadPromises = [];

    

    for(let i=0;i<keys.length;i++){



        req.awsUrls[keys[i]]=[];
        let files=req.files[keys[i]];

        for(let j=0;j<files.length;j++){

            let file=files[j];
            const fileStream=fs.createReadStream(file.path)

            const params = {
                Bucket: process.env.BUCKETNAME,
                Key: file.fieldname+"/"+file.filename, 
                Body: fileStream,  
                ContentType: file.mimetype,  
              };


              const uploadPromise=new Promise((resolve,reject)=>{


                s3.upload(params, (err, data) => {
                    if (err) {
                      console.error(err);
                      reject(err)
                    
                    } else {
                    //     console.log("Image uploaded to AWS---")
                    //   console.log('Image uploaded successfully:', data);
    
                    
                      req.awsUrls[keys[i]].push(data.Location)
                      resolve();
                    }
                  }
                  
                  );


              })


              uploadPromises.push(uploadPromise)
              
               
        }
    }


    await Promise.all(uploadPromises)



    next();
  
}

module.exports={uploadFilesToAWS}