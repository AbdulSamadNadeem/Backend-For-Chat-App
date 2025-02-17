const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    chatID:{
        type:mongoose.Schema.Types.ObjectId , ref:'chats'
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId , ref:'users'
    },
    text:{
        type:String,
        required:true
    },
    read:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const MessageModel = mongoose.model('messages' , MessageSchema)

module.exports = MessageModel