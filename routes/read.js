import express from "express";
import { readAllHazards } from "../controllers/read.js";

const router = express.Router();

router.get("/allhazards", readAllHazards);

export default router;
