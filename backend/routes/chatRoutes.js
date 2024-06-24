import express from "express";
const router = express.Router();

import {addChat} from "../controller/chatController.js";
import isAuthenticated from "../authenticated/authenticated.js";

router.route("/addChat").post(addChat);

export default router;
