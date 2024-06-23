import express from "express";
const router = express.Router();

import {Login, Register} from "../controller/userController.js";

router.route("/login").post(Login);
router.route("/register").post(Register);

export default router;
