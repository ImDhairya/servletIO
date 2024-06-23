import express from "express";
import {createServer} from "http";
import initializeSocket from "./socket/socket.js";
import cors from "cors";
const app = express();
const server = createServer(app);
import {Connect} from "./connect.js";

Connect();

initializeSocket(server);
server.listen(5000, () => {
  console.log("Server is running at 5000 okay");
});
const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

import userRoute from "./routes/userRoutes.js";

app.use("/api/user", userRoute);

app.listen(3002, () => {
  console.log("App is running and listeningg at 3002");
});
