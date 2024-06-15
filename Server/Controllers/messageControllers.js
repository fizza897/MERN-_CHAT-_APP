import {Conversation} from "../Models/conversationModel.js"
import { Message } from "../Models/messageModel.js";
import {getReceiverSocketId} from "../Socket/Socket.js"
import {io} from "../Socket/Socket.js"
export const sendMessage =async (req,res)=>{
  try {
    const senderId=req.id;
    const receiverId =req.params.id;
    const {message} =req.body
    let gotConverstion =await Conversation.findOne({
      participants:{$all:[senderId,receiverId]}
    });
    if(!gotConverstion){
      gotConverstion = await Conversation.create({
        participants:[senderId,receiverId]
      })
    };
    const newMessage =await Message.create({
      senderId,
      receiverId,
      message
    });
    if(newMessage){
      gotConverstion.message.push(newMessage._id);
    };

    await Promise.all([gotConverstion.save(),newMessage.save()]);

    // using socket ui impletion:-
    const receiverSocketId=getReceiverSocketId(receiverId)
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage",newMessage); 
    }
    return res.status(201).json({
      newMessage
    })

  } catch (error) {
    console.log(error)
  }
}

export const getMessage=async (req,res)=>{
  try {
    const receiverId =req.params.id;
    const senderId=req.id; 
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    }).populate('message');
    return res.status(200).json(conversation?.message);
  } catch (error) {
    console.log(error)  
  }
    
}