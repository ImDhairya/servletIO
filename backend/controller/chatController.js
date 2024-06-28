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

export const fetchChat = async (req, res) => {
  try {
    const {userId, receiver} = req.body;

    if (!userId || !receiver) {
      return;
    }
    const chat = await Chat.find({
      $or: [
        {sender: userId, receiver: receiver},
        {sender: receiver, receiver: userId},
      ],
    });

    if (!chat) {
      return res.status(200).json({
        message: "No chats found between these users",
        success: true, // Indicate success even though no chats found
        chats: [],
      });
    }

    const senderChatId = await Users.findById({_id: userId}, "chats").exec();
    
    console.log(senderChatId.chats);
    const receiverChatId = await Users.findById({_id: receiver}, "chats");

    // console.log(senderChatId.chats);

    // const chats = await Chat.find({_id: {$in: senderChatId.chats}}).exec();

    // const chats = senderChatId.chats.filter((chatId) => {
    //   return senderChatId.some((chat) => chat._id === chatId);
    // });
    // console.log(chats);

    // console.log(chats, "senders chats");
    // const senderChats = chat.find((element) => {
    // console.log(element);
    // senderChatId.chats.find((ch) => {
    // console.log(ch, 'gibbrish');
    // return ch._id === element._id;
    // });
    // if (element._id === )
    // return element._id === sende;
    // });
    // if (!chat) {
    //   return res.status("401").json({
    //     message: "chats not found",
    //     success: false,
    //   });
    // }
    // return res.status(201).json({
    //   chats: chat,
    // });
  } catch (error) {
    console.error("Error fetching chat:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
