import mongoose from "mongoose";
import {Chat} from "../modals/chatSchema.js";
import {Users} from "../modals/userSchema.js";

export const addChat = async (req, res) => {
  try {
    const {chat, userId, isSender, receiver} = req.body;
    console.log(req.body.user);
    const user = Users.findById({userId});
    if (!user) {
      return res.status("401").json({
        message: "User not found you cannot send non annomous chats here",
        success: false,
      });
    }

    const data = await Chat.create({
      isSender,
      content: chat,
      sender: userId,
      receiver: receiver,
      // user: [userId],
    });

    console.log(data);
    let ObjId = new mongoose.Types.ObjectId(data._id);

    await Users.updateOne(
      {_id: userId},
      {
        $push: {
          chats: ObjId,
        },
      }
    );

    if (data) {
      return res.status(201).json({
        message: "Data updated successfully ",
        success: true,
      });
    }
  } catch (error) {
    console.error("Error adding chat:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
