import express from "express";
import { authenticate } from "../controllers/auth.js";
import { readAllHazards, readAllHazardsOfUser } from "../controllers/read.js";

const router = express.Router();

router.get("/allhazards", readAllHazards);
router.get("/allhazardsofuser", authenticate, readAllHazardsOfUser);

export default router;
