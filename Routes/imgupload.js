const { Image_upload } = require('../modals/image-upload');
const config = process.env;
const express = require('express');
const cloudinary = require("cloudinary").v2;
const utils = require('../utils');
// const multer = require('multer');
// env variables
require("dotenv").config();

var img_url;



module.exports = {


    img_upload: async function (req, res) {
       
       
        let img_url = await utils.uploadImg(req);
        // const url = this.uploadImg(request)
        // var r = req.result;
        console.log('123')
        console.log(img_url);
        const data = JSON.parse(req.body.data);
        console.log(data)
        // this.uploadImg
        
        // cloudinary.config({
        //     cloud_name: "dvaldxya4",
        //     api_key: "596668946624764",
        //     api_secret: "VW4xHk6B65FV79ThJsE42_dNt5w"
        //   });

        //   var a = cloudinary.uploader.upload_stream(
        //     { folder: 'testing_angular_cloud' }, 
        //     (error, result) => {
        //         this.img_url = result.url
        //         console.log(result.url)
                
        //     if (error) {
        //       console.error(error);
        //       return res.status(500).json({ error: 'Error uploading file to Cloudinary' });
        //     }
        //     return result;
        //     // res.json(result);
        // }).end(req.file.buffer);
        // console.log('hello');
        // console.log(a)
          
       let headings = await Image_upload.findOne({ img_url: img_url });

        if (headings) {
            return res.json({ token: '409', msg: 'The img category already exists!' });
        }
        else {
            // Insert the question if they do not exist yet
            headings = new Image_upload({
                heading:data.img_headings,
                description: data.img_description,
                img_url: img_url,
                publish_date: data.publish_date

            });
        

            const result = await Image_upload.create(headings);
            if(result)
            {
                return res.json({ token: '200', article: headings });
            }
            else
            {
                return false;
            }
    

        }
    },

    get_image: async function(req,res){
        let data = await Image_upload.find();
        if(data)
            {
                return res.json({ token: '200', article: data });
            }
            else
            {
                return false;
            }
    },

    update_image: async function(req,res){
      
        const data = JSON.parse(req.body.data);
        console.log(data._id)
        console.log(data)
        
        let headings = await Image_upload.findById(data._id);
        

        if (headings) {

            if(req.file){
                 let img_url = await utils.uploadImg(req);
                 headings = {
                    heading:data.img_headings,
                    description: data.img_description,
                    img_url: img_url,
                    publish_date: data.publish_date
                };
            }else{
                headings = {
                    heading:data.img_headings,
                    description: data.img_description,
                    publish_date: data.publish_date
                };
            }
           
            const result = await Image_upload.updateOne({_id:data._id},headings);
            console.log(1112)
            console.log(result)
            if(result)
            {
                return res.json({ token: '200', article: headings });
            }
            else
            {
                return false;
            }
        }
        else {
            return res.json({ token: '409', msg: 'The img category already exists!' });
        }

        // let img_url = await utils.uploadImg(req);
        // // const url = this.uploadImg(request)
        // // var r = req.result;
        // console.log('123')
        // console.log(img_url);
        // const data = JSON.parse(req.body.data);
        // console.log(data)
    
          
      
    }

}