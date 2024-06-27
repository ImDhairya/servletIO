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
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    // #############################

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
