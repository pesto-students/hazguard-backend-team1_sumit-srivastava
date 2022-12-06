import mongoose from "mongoose";

const paymentsSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	country: {
		type: String,
		required: true,
	},
	orderId: {
		type: String,
		required: true,
		unique: true,
	},
	razorpayOrderId: {
		type: String,
		required: true,
		unique: true,
	},
	razorpayPaymentId: {
		type: String,
		required: true,
		unique: true,
	},
	subscriptionType: {
		type: String,
		required: true,
		enum: ["Free", "National", "International"],
		default: "Free",
	},
	amountPaid: {
		type: Number,
		required: true,
	},
	paymentDate: {
		type: Date,
		required: true,
		default: Date.now(),
	},
	dueDate: {
		type: Date,
		required: true,
		default: Date.now() + 2592000000,
	},
});

export default mongoose.model("Payment", paymentsSchema);
