import express from "express";
import { authenticate } from "../controllers/auth.js";
import { profile, updateProfile, addToSavedPosts, deleteFromSavedPosts } from "../controllers/user.js";

const router = express.Router();

router.get("/profile", authenticate, profile);
router.patch("/updateprofile", authenticate, updateProfile);
router.post("/addtosavedposts", authenticate, addToSavedPosts);
router.post("/deletefromsavedposts", authenticate, deleteFromSavedPosts);

export default router;
