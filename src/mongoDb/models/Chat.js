const mongoose = require("mongoose");
const { chatBotDB } = require("../../mongoDb/config-db/db");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      enum: ["user", "support"],
    },
    text: String,
  },
  { timestamps: true }
);

const conversationSchema = new mongoose.Schema(
  {
    userId: String,
    messages: [messageSchema],
  },
  { timestamps: true }
);

module.exports = chatBotDB.model("Conversation", conversationSchema);
