import {Server} from "socket.io";

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

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
};

export default initializeSocket;
