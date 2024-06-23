import express from "express";
import {createServer} from "http";
import {fileURLToPath} from "url";
import {dirname, join} from "path";
import {Server} from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("A user is connected ");
  console.log("What is socket: ", socket);

  socket.on("chat", (payload) => {
    console.log("What is payload", payload);
    io.emit("chat", payload);
  });
}); // it will wait for the client to connect and then emit this to the clients. inside this handler it listens for the chat event from client and then broadcasts the payload to all clients.

io.emit("hello", "world"); // it will be emiting 'hello' event to all clients connected at the moment as it's outside the connection handler will run immediately

io.on("connection", (socket) => {
  socket.broadcast.emit("Hi");
});

server.listen(3000, () => {
  console.log("Server running at localhost 3000");
});
