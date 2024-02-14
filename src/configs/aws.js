const AWS = require('aws-sdk');
  
  const s3 = new AWS.S3({
    secretAccessKey: process.env.AWSSECRETKEY,
    accessKeyId: process.env.AWSKEYID,
    region: process.env.AWSREGION
  })

  console.log("Region is ");
  console.log(process.env.AWSREGION)
  console.log(process.env.BUCKETNAME)

//   console.log("AWS-CONFIG IS ")
//   console.log(AWS.config)
  module.exports={s3}