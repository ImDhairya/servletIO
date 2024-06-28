import express from "express";
const router = express.Router();

import {addChat, fetchChat} from "../controller/chatController.js";
import isAuthenticated from "../authenticated/authenticated.js";

router.route("/addChat").post(addChat);
router.route("/fetchChat").post(fetchChat);

export default router;
