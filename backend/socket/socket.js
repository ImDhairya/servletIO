import {Server, Socket} from "socket.io";

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  /* 
This is used for broadcasting message to everyone annonomusly

  io.on("connection", (socket) => {
    // making the connection ready so that someone can connect to this
    console.log("A user is connected ");
    // console.log("What is socket: ", socket);
    
    socket.on("chat", (payload) => {
      // creating a separate event called chat
      // console.log("What is payload", payload);
      io.emit("chat", payload);
    });
  });
  */

  io.on("connection", (socket) => {
    console.log("A user is connected");

    socket.on("join", (userId) => {
      console.log(`User joined room: ${userId}`);
      socket.join(userId);
      socket.userId = userId;
    });

    socket.on("chat", (payload) => {
      const {message, senderId, receiverId} = payload;
      console.log(
        `Message from user ${senderId} to user ${receiverId}: ${message}`
      );
      io.to(receiverId).emit("chat", {message, senderId});
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected");
    });
  });
};
export default initializeSocket;
