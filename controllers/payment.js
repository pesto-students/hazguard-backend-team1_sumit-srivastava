import Razorpay from "razorpay";

const createPayment = async (req, res) => {
	const razorpayInstance = new Razorpay({
		key_id: process.env.RAZORPAY_KEY_ID,
		key_secret: process.env.RAZORPAY_SECRET,
	});
	const allPlans = await razorpayInstance.plans.all();
	console.log(allPlans.items[0]);

	// const response = instance.subscriptions.create(params2);
};

export { createPayment };
