import express from "express";
const router = express.Router();

import {
  AllUsers,
  Login,
  Logout,
  Register,
  UserDetails,
} from "../controller/userController.js";
import isAuthenticated from "../authenticated/authenticated.js";

router.route("/login").post(Login);
router.route("/register").post(Register);
router.route("/logout").post(Logout);
router.route("/getuser").post( UserDetails);
router.route("/allUsers").post(AllUsers);
export default router;
