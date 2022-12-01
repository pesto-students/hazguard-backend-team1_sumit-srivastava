import express from "express";
import { authenticate } from "../controllers/auth.js";
import { readAllHazards, leaderboardData } from "../controllers/read.js";

const router = express.Router();

router.get("/allhazards", readAllHazards);
router.get("/leaderboard", authenticate, leaderboardData);

export default router;
