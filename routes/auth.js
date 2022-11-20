import express from "express";
import { register, verify, logIn, logOut, profile, getToken, authenticate } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.get("/register/verify/:confirmationToken", verify);
router.post("/login", logIn);
router.get("/logout", logOut);
router.get("/profile", authenticate, profile);
router.get("/gettoken", getToken);

export default router;
