import express from "express";
import { authenticate } from "../controllers/auth.js";
import { createHazard } from "../controllers/create.js";

const router = express.Router();

router.post("/hazard", authenticate, createHazard);

export default router;
