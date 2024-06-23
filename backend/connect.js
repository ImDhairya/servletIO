import mongoose from "mongoose";

export const Connect = () => {
  try {
    mongoose
      .connect(
        "mongodb+srv://maheshbhatt181995:7kmDH42pr939TpCT@temp.zsulayp.mongodb.net/?retryWrites=true&w=majority&appName=temp"
      )
      .then(() => {
        console.log("Connected to mongoose db");
      });
  } catch (error) {
    (error) => console.log("errorr connecting", error);
  }
};
