import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,// mongoose.Schema.Types.ObjectId is used to define a field
			//  that will store an ObjectId, 
			// which is a unique identifier for a document in MongoDB. 
			// In this case, senderId will store the ObjectId of the user who sent the message.
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,// receiverId will store the ObjectId of the user
			//  who will receive the message.
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
