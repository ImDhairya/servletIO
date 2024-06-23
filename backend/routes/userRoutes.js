import express from "express";
const router = express.Router();

import {Login, Logout, Register} from "../controller/userController.js";

router.route("/login").post(Login);
router.route("/register").post(Register);
router.route("/logout").post(Logout);

export default router;
