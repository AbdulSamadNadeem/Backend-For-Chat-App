const ChatModel = require('../Models/ChatModel')

exports.startchat = async (req,res) => {
    try{
        const chat = new ChatModel(req.body)
        const savedChat = await chat.save()
        
        res.status(201).json({
            status:"success",
            message:"chat saved successfully",
            chat:savedChat
        })

    }catch(err){
        res.status(400).json({
            status:"failed",
            message:`something went wrong ${err.message}`
        })
    }
}
exports.getAllchats = async (req,res) => {
    try{
        const Allchat = await ChatModel.find({members : {$in: req.user._id}}).populate('members').sort({upadatedAt:-1})
        
        res.status(200).json({
            status:"success",
            message:"Users Fetched successfully",
            Allchat,
        })

    }catch(err){
        res.status(400).json({
            status:"failed",
            message:`something went wrong ${err.message}`
        })
    }
}
