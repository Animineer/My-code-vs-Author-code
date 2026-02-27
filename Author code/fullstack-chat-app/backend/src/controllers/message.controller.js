import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    //ne is not equal to , -password is not included in the result
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {


    //in route we have /api/messages/:id, so req.params.id will give us the id of the user I'm chatting with
    const { id: userToChatId } = req.params; // this is the id of the user I'm chatting with
    const myId = req.user._id;


    const messages = await Message.find({
      $or: [ // we want to get messages where either the sender is me and the receiver is the user I'm chatting with, or the sender is the user I'm chatting with and the receiver is me
        { senderId: myId, receiverId: userToChatId }, //this is for messages sent by me to the user I'm chatting with
        { senderId: userToChatId, receiverId: myId }, //this is for messages sent by the user I'm chatting with to me
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


//it could be used for both text and image messages, 
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId, //us
      receiverId, //the user I'm chatting with
      text,
      image: imageUrl, //cloudinary 
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
