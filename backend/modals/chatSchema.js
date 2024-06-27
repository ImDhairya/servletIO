import mongoose, {Schema} from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    // isSender: {
    //   type: Boolean,
    // required: true,
    // },
    content: {
      type: String,
      required: true,
    },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    // isReceiver: {
    //   type: Boolean,
    //   required: true,
    // },
    // participants: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Users",
    //   },
    // ],
    // isGroupChat: {
    //   type: Boolean,
    //   default: false,
    // },
    // lastMessage: {
    //   type: Schema.Types.ObjectId,
    //   ref: "ChatMessage",
    // },
    // admin: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
  },
  {timestamps: true}
);

export const Chat = mongoose.model("Chat", chatSchema);
