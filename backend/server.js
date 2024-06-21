import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";

const app = express();
const server = createServer(app);
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

const count = io.engine.clientsCount;
console.log(count);

const count2 = io.of("/").sockets.size;
console.log(count2);

server.listen(5000, () => {
  console.log("Server is rrunning at 5000 okay");
});
