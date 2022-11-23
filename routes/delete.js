import express from "express";
import { authenticate } from "../controllers/auth.js";
import { deleteHazard } from "../controllers/delete.js";

const router = express.Router();

router.delete("/hazard", authenticate, deleteHazard);

export default router;
