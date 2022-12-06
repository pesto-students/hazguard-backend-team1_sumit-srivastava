import Razorpay from "razorpay";
import User from "../models/user.js";
import Payment from "../models/payment.js";
import { v4 } from "uuid";
import { sha256 } from "js-sha256";

const createSubscription = async (req, res) => {
	const razorpayInstance = new Razorpay({
		key_id: process.env.RAZORPAY_KEY_ID,
		key_secret: process.env.RAZORPAY_SECRET,
	});
	User.findOne({ userId: req.user.userId }, async function (err, user) {
		if (err) return res.status(500).json({ error: true, message: err });
		if (!user) return res.status(404).json({ error: true, message: "User not found!" });
		switch (req.body.planType) {
			case "internationalplan":
				return res.status(200).json({ data: await razorpayInstance.subscriptions.create({ plan_id: "plan_KjmlYijwbBKhli", total_count: 12 }) });
			case "nationalplan":
				return res.status(200).json({ data: await razorpayInstance.subscriptions.create({ plan_id: "plan_Kjml1kO93VnjjO", total_count: 12 }) });
		}
	});
};

const verifyPayment = async (req, res) => {
	User.findOne({ userId: req.user.userId }, async function (err, user) {
		if (err) return res.status(500).json({ error: true, message: err });
		if (!user) return res.status(404).json({ error: true, message: "User not found!" });
		if (sha256.hmac(process.env.RAZORPAY_SECRET, req.body.razorpay_payment_id + "|" + req.body.razorpay_subscription_id) === req.body.razorpay_signature) {
			const newPayment = new Payment({
				userId: req.user.userId,
				email: user.email,
				country: user.country,
				orderId: v4(),
				razorpayOrderId: req.body.razorpay_subscription_id,
				razorpayPaymentId: req.body.razorpay_payment_id,
				subscriptionType: req.body.planType === "internationalplan" ? "International" : "National",
				amountPaid: req.body.planType === "internationalplan" ? "1000" : "500",
			});
			newPayment.save((err, doc) => {
				if (err) return res.status(500).json({ error: true, message: err });
			});
			user.subscriptionType = req.body.planType === "internationalplan" ? "International" : "National";
			user.save((err, doc) => {
				if (err) return res.status(500).json({ error: true, message: err });
				return res.status(200).json({ message: "Subscription Bought!" });
			});
		} else {
			return res.status(503).json({ error: true, message: "Payment Not Verified" });
		}
	});
};

export { createSubscription, verifyPayment };
