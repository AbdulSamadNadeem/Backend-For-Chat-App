const MessageModel = require('../Models/MessageModel')
const ChatModel = require('../Models/ChatModel')


exports.sendmessage = async (req,res) => {
    try{
         // save the message
        
        const message = await MessageModel.create(req.body)
  
        // update the chatmodel
        const currentchat = await ChatModel.findById(req.body.chatID)
        if(!currentchat){
            res.status(400).json({
                status:"Failed",
                message:"user not found ",
                
            })
        }
        
        currentchat.lastmessage = message._id

        await currentchat.save()
           

        res.status(201).json({
            status:"success",
            message:"message sent!",
            message
        })

    }catch(err){
        console.log(err)
            res.status(400).json({
                status:"Failed",
                message:"something went wrong",
                error:err.message
            })
    }
}
exports.getallmessages = async (req,res) => {
    try{
      const {chatID} = req.params
        const allmessages = await MessageModel.find({chatID :chatID}).sort({createdAt:1})
        if(!allmessages){
           return res.status(400).json({
                status:"Failed",
                message:"user not found ",
            })
        }
        res.status(200).json({
            status:"success",
            message:"All messages Fetched!",
            allmessages
        })

    }catch(err){
        res.status(400).json({
            status:"Failed",
            message:"something went wrong",
            error:err.message
        })
    }
}