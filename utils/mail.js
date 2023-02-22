import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: process.env.NODE__MAILER_EMAIL,
		pass: process.env.NODE__MAILER_PASSWORD,
	},
});
// Function to send mail
const sendEmail = (name, email, info, key) => {
	switch (key) {
		case "verificationEmail":
			transport
				.sendMail({
					from: process.env.NODE__MAILER_EMAIL,
					to: email,
					subject: "Please confirm your account",
					html: `<h1>Email Confirmation</h1>
		  <h2>Hello ${name}</h2>
		  <p>Thank you for registering. Please confirm your email by clicking on the following link</p>
		  <a href=https://www.hazguard.tech/verify/${info}> Click here</a>`,
				})
				.catch((err) => console.log(err));
			break;
		case "hazard":
			transport
				.sendMail({
					from: process.env.NODE__MAILER_EMAIL,
					to: email,
					subject: "You added an hazard",
					html: `<h1>hazard Added</h1>
			  <h2>Hello ${name}</h2>
			  <p>Thank you for adding a hazard.</p>`,
				})
				.catch((err) => console.log(err));
			break;
	}
};

export { sendEmail };
