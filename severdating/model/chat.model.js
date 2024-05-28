const mongoose = require("mongoose");
const chatSchema = mongoose.Schema({
  senderId: {
    type: String,
  },
  receiverId: {
    type: String,
  },
  message: {
    type: String,
  },
  timestamp: {
    type: String,
    default: Date.now,
  },
});
const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
