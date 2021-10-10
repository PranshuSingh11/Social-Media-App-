const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const multer = require('multer');
const path = require('path')
const verify = require('./verifyToken')
const User = require('../models/User')
const mongoose = require('mongoose')

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null, './uploads');
  },
  filename: function(req,file,cb){
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({storage:storage})

router.get("/",verify, async (req, res) => {

  try {
    const posts = await Post.find().populate("postedBy","_id name").populate("comments.postedBy","_id name")
    res.json(posts)
  } catch (error) {
    res.json({message:error})
  }
});

router.get("/myposts",verify, async (req, res) => {

  try {
    const singleuserposts = await Post.find({postedBy:req.user._id}).populate("postedBy","_id name") .populate("comments.postedBy","_id name")
    res.json(singleuserposts)
  } catch (error) {
    res.json({message:error})
  }
});

router.put("/singlepost", async (req, res) => {

  try {
    const post = await Post.findOne({_id:req.body.pId})
    res.json(post)
  } catch (error) {
    res.json({message:error})
  }
});




router.post("/",upload.single('image'),verify ,(req, res) => {
  console.log(req.file)
  const url = req.protocol + '://' + req.get('host')
  const post = new Post({
    caption: req.body.caption,
    image:url + '/uploads/' + req.file.filename,
    postedBy:req.user
  });

  post
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.put('/like',verify, (req,res)=>{
 Post.findByIdAndUpdate(req.body.postId,{
    $addToSet:{likes:req.user._id}
  },{
    new:true
  }).populate("postedBy","_id name")
  .populate("comments.postedBy","_id name")
  .exec((err,result)=>{
    if(err)
      return res.status(422).json({error:err})  
    else{
       res.json(result)
    }
  })
})

router.put('/unlike',verify, (req,res)=>{
  Post.findByIdAndUpdate(req.body.postId,{
     $pull:{likes:req.user._id}
   },{
     new:true
   }).populate("postedBy","_id name")
   .populate("comments.postedBy","_id name")
   .exec((err,result)=>{
     if(err)
       return res.status(422).json({error:err})  
     else{
        res.json(result)
     }
   })
 })


 router.put('/comment',verify, (req,res)=>{
  const comment = {
    text:req.body.text,
    postedBy:req.user._id
  }
  Post.findByIdAndUpdate(req.body.postId,{
     $push:{comments:comment}
   },{
     new:true
   })
   .populate("postedBy","_id name")
   .populate("comments.postedBy","_id name")
   .exec((err,result)=>{
     if(err)
       return res.status(422).json({error:err})  
     else{
        res.json(result)
     }
   })
 })







module.exports = router;
