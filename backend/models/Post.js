const mongoose = require('mongoose')
var {ObjectId} = mongoose.Schema.Types
const User = require('./User')


const PostSchema = mongoose.Schema({
    caption:{
        type:String,
    },
    image:{
        type:String,
    },
    likes:[{
        type:ObjectId,
        ref:'User'
    }],
    comments:[{
        text:String,
        postedBy:{
            type:ObjectId,
            ref:'User'
        }
    }],
    postedBy:{
        type:ObjectId,
        ref:'User'
    }
})

module.exports = mongoose.model('Post',PostSchema)