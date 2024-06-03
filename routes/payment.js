import express from "express";
import { authenticate } from "../controllers/auth.js";
import { createSubscription, verifyPayment } from "../controllers/payment.js";

const router = express.Router();

router.post("/createsubscription", authenticate, createSubscription);
router.post("/verifypayment", authenticate, verifyPayment);

export default router;
