
const config = process.env;
const express = require('express');
const cloudinary = require("cloudinary").v2;


module.exports = {

   
    uploadImg: async function(req,res){
        // console.log(req.file);
        const file = req.file;
        var img_url;
        cloudinary.config({
            cloud_name: "dvaldxya4",
            api_key: "596668946624764",
            api_secret: "VW4xHk6B65FV79ThJsE42_dNt5w"
          });

          return new Promise((resolve,reject)=>{
            cloudinary.uploader.upload(__dirname+'/uploads/'+file.filename, (error,result )=>{
                // await unlinkAsync(__dirname+'/uploads/'+file.filename)
                resolve( result.url);
              })
            //  cloudinary.uploader.upload_stream(
            //     { folder: 'testing_angular_cloud' }, 
            //     (error, result) => {
                   
                 
            //         // console.log(result.url)
                 
                  
            //     if (error) {
            //       console.error(error);
                  
            //     }
            //     // res.json(result);
            //     resolve( result.url);
            // })
            // .end(req.file.buffer);
            // console.log('hello');
          })
         
        
       
    },
}