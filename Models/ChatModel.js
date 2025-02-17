const mongoose = require("mongoose");
const ChatSchema = new mongoose.Schema({

  members: {
    type: [
        {type : mongoose.Schema.Types.ObjectId , ref:'users'}
    ],
    },
    lastmessage:{
        type : mongoose.Schema.Types.ObjectId , ref:'messages',

    },
    readmessagecount:{
        type:Number,
        default:0
    }
},{timestamps:true});


const ChatModel = mongoose.model("chats" , ChatSchema)

module.exports = ChatModel