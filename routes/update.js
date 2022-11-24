import express from "express";
import { authenticate } from "../controllers/auth.js";
import { updateHazard, setHazardVisibilityTrue, setHazardVisibilityFalse } from "../controllers/update.js";

const router = express.Router();

router.patch("/hazard", authenticate, updateHazard);
router.patch("/viewable", authenticate, setHazardVisibilityTrue);
router.patch("/hidden", authenticate, setHazardVisibilityFalse);

export default router;
