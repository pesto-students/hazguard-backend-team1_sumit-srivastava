import mongoose from "mongoose";

const paymentsSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
	},
	country: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
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
	subLevel: {
		type: Number,
		required: true,
		default: 0,
		enum: [0, 1, 2],
	},
	amountPaid: {
		type: Number,
		required: true,
		default: 0,
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

export const paymentModel = mongoose.model("Payment", paymentsSchema);
