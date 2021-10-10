const router = require("express").Router();
const { findOne } = require("../models/User");
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const verify = require('./verifyToken');
const Post = require("../models/Post");
const multer = require('multer');

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null, './uploads');
  },
  filename: function(req,file,cb){
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({storage:storage})


router.get("/",verify,async (req,res)=>{


  try {
    const userinfo = await  User.findOne({_id:req.user})
    res.json(userinfo)
  } catch (error) {
    res.json({message:error})
  }
})



router.get("/allusers",verify,async (req,res)=>{


  try {
    const usersinfo = await  User.find()
    res.json(usersinfo)
  } catch (error) {
    res.json({message:error})
  }
})


router.get("/:id",verify, (req,res)=>{


  try {
    User.findOne({_id:req.params.id})
    .then(user=>{
      Post.find({postedBy:req.params.id})
      .populate("postedBy","_id name")
      .exec((err,posts)=>{
        if(err)
          return res.status(400).json({error:err})
        res.json({user,posts})
      })
    })
  } catch (error) {
    res.json({message:error})
  }
})


router.post("/register" ,async (req, res) => {
  const { error } = await registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  const nameExists = await User.findOne({ name: req.body.name });
  if (nameExists) return res.status(400).send("Username already exists");

  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(req.body.password,salt)
  // const hashedPassword = passwordHash.generate(req.body.password);


  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }

});

router.post("/login", async (req, res) => {


  const { error } = await loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not found");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid Password");

  //Create and assign a token
  const {_id,name,following} = user
  const  token = jwt.sign({_id:user._id,name:user.name},process.env.TOKEN_SECRET)
  res.header('auth-token',token).send({token,user:_id,name,following})

  res.send("Logged in");
});


router.put('/follow',verify,(req,res)=>{
  User.findByIdAndUpdate(req.body.followId,{
    $addToSet:{followers:{followedBy:req.user._id,name:req.user.name}},
  },{
    new:true
  },(err,result)=>{
    if(err)
      return res.status(400).json({error:err})
    User.findByIdAndUpdate(req.user._id,{
      $addToSet:{following:{followingBy:req.body.followId,name:req.body.name}},
    },{
      new:true
    }).then(result=>{
      res.json(result)
    }).catch(err=>{
      return res.status(400).json({error:err})
    })
  }).populate("followers.followedBy","_id name") .populate("following.followingBy","_id name")
})


router.put('/unfollow',verify,(req,res)=>{
  User.findByIdAndUpdate(req.body.followId,{
    $pull:{followers:{followedBy:req.user._id,name:req.user.name}},
  },{
    new:true
  },(err,result)=>{
    if(err)
      return res.status(400).json({error:err})
    User.findByIdAndUpdate(req.user._id,{
      $pull:{following:{followingBy:req.body.followId,name:req.body.name}},
    },{
      new:true
    }).then(result=>{
      res.json(result)
    }).catch(err=>{
      return res.status(400).json({error:err})
    })
  }).populate("followers.followedBy","_id name") .populate("following.followingBy","_id name")
})

router.post('/profileImg',upload.single('image'),verify,(req,res)=>{
  console.log(req.file)
  const url = req.protocol + '://' + req.get('host')
  const profileImage = url + '/uploads/' + req.file.filename

  User.findByIdAndUpdate(req.user._id,{
    profileImg:profileImage
  },{
    new:true
  })
  .exec((err,result)=>{
    if(err)
      return res.status(422).json({error:err})  
    else{
       res.json(result)
    }
  })
})

module.exports = router;
