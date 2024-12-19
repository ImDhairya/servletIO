import mongoose from "mongoose";

export const Connect = () => {
  try {
    // enter your own mongoose database id
    mongoose
      .connect(
        "mongodb+srv://pandyadhairya789:2kGd5oiw3nYoELSK@databaselauncher.y270c.mongodb.net/?retryWrites=true&w=majority&appName=DatabaseLauncher"
      )
      .then(() => {
        console.log("Connected to mongoose db");
      });
  } catch (error) {
    (error) => console.log("errorr connecting", error);
  }
};
