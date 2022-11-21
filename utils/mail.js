import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD,
	},
});

const sendEmail = (name, email, info, key) => {
	switch (key) {
		case "verificationEmail":
			transport
				.sendMail({
					from: process.env.EMAIL,
					to: email,
					subject: "Please confirm your account",
					html: `<h1>Email Confirmation</h1>
		  <h2>Hello ${name}</h2>
		  <p>Thank you for registering. Please confirm your email by clicking on the following link</p>
		  <a href=https://backend.hazguard.tech/api/auth/register/verify/${info}> Click here</a>`,
				})
				.catch((err) => console.log(err));
			break;
	}
};

export { sendEmail };
