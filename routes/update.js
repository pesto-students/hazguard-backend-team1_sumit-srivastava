import express from "express";
import { authenticate } from "../controllers/auth.js";
import { updateHazard, increaseViewCount } from "../controllers/update.js";

const router = express.Router();

router.patch("/hazard", authenticate, updateHazard);
router.patch("/increaseviewcount", authenticate, increaseViewCount);

export default router;
