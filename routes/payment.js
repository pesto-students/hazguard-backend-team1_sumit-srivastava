import express from "express";
import { authenticate } from "../controllers/auth.js";
import { createPayment } from "../controllers/payment.js";

const router = express.Router();

router.post("/create", authenticate, createPayment);

export default router;
