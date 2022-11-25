import express from "express";
import { authenticate } from "../controllers/auth.js";
import { profile, updateProfile, getAllSavedHazards, addToSavedPosts, deleteFromSavedPosts } from "../controllers/user.js";

const router = express.Router();

router.get("/profile", authenticate, profile);
router.patch("/updateprofile", authenticate, updateProfile);
router.post("/addtosavedposts", authenticate, addToSavedPosts);
router.post("/deletefromsavedposts", authenticate, deleteFromSavedPosts);
router.get("/allsavedposts", authenticate, getAllSavedHazards);

export default router;
