import express from "express";
import { register, verify, logIn, logOut, getToken } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.get("/register/verify/:confirmationToken", verify);
router.post("/login", logIn);
router.post("/logout", logOut);
router.get("/gettoken", getToken);

export default router;
