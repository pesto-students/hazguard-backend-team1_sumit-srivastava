import User from "../models/user.js";
import Token from "../models/token.js";
import Jwt from "jsonwebtoken";
import { sendEmail } from "../utils/mail.js";
import { v4 } from "uuid";
import * as dotenv from "dotenv";

dotenv.config();

const register = (req, res) => {
	User.findOne({ email: req.body.email }, function (err, user) {
		if (err) return res.status(500).json({ error: true, message: err });
		if (user) return res.status(409).json({ error: true, message: "email exists" });
		if (!req.body.password) return res.status(400).json({ error: true, message: "password required" });
		const newUser = new User({
			userId: v4(),
			firstName: req.body.firstName,
			email: req.body.email,
			companyName: req.body.companyName,
			profilePicture: req.body.profilePicture,
			confirmationToken: Jwt.sign(req.body.email, process.env.CONFIRMATION_TOKEN_SECRET).split(".").join(""),
		});
		newUser.setPassword(req.body.password);
		newUser.save((err, doc) => {
			if (err) return res.status(500).json({ error: true, message: err });
			sendEmail(newUser.firstName, newUser.email, newUser.confirmationToken, "verificationEmail");
			return res.status(200).json({
				message: "User created succesfully.",
			});
		});
	});
};

const verify = (req, res) => {
	User.findOne({ confirmationToken: req.params.confirmationToken }, (err, user) => {
		if (err) return res.status(500).json({ error: true, message: err });
		if (!user) return res.status(404).json({ error: true, message: "User Not found." });
		user.status = "Active";
		user.save((err, doc) => {
			if (err) return res.status(500).json({ error: true, message: err });
			return res.status(200).json({ message: "user verified" });
		});
	});
};

const generateAccessToken = (userData) => {
	return Jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const logIn = (req, res) => {
	User.findOne({ email: req.body.email }, function (err, user) {
		if (err) return res.status(500).json({ error: true, message: err });
		if (!user) {
			return res.status(404).json({
				error: true,
				message: "User does not exist",
			});
		}
		if (!user.validPassword(req.body.password)) {
			return res.status(403).json({
				error: true,
				message: "Wrong Password",
			});
		}
		if (user.status !== "Active") {
			return res.status(403).json({
				error: true,
				message: "Pending Account. Please Verify Your Email!",
			});
		}
		const accessToken = generateAccessToken({
			userId: user.userId,
			email: user.email,
		});
		const refreshToken = Jwt.sign(
			{
				userId: user.userId,
				email: user.email,
			},
			process.env.REFRESH_TOKEN_SECRET
		);
		const token = new Token({
			token: refreshToken,
		});
		token.save((err, doc) => {
			if (err) return res.status(500).json({ error: true, message: err });
			return res.status(200).json({
				message: "User successfully logged in.",
				accessToken,
				refreshToken,
			});
		});
	});
};

const getToken = (req, res) => {
	if (!req.body.token) {
		return res.status(401).json({
			error: true,
			message: "Unauthorized",
		});
	}
	Token.findOne({ token: req.body.token }, function (err, token) {
		if (err) return res.status(500).json({ error: true, message: err });
		if (!token) {
			return res.status(404).json({
				error: true,
				message: "Invalid token",
			});
		}
		Jwt.verify(req.body.token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
			if (err) return res.status(500).json({ error: true, message: err });
			if (!user) {
				return res.status(403).json({
					error: true,
					message: "Unauthorized",
				});
			}
			return res.status(200).json({
				accessToken: generateAccessToken({
					userId: user.userId,
					email: user.email,
				}),
			});
		});
	});
};

const logOut = (req, res) => {
	Token.deleteOne({ token: req.body.token }, function (err, token) {
		if (err) return res.status(500).json({ error: true, message: err });
		if (!token.deletedCount) {
			return res.status(404).json({
				error: true,
				message: "Invalid token",
			});
		} else {
			return res.status(200).json({
				message: "Logged out successfully",
			});
		}
	});
};

const authenticate = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (token === null) {
		return res.status(401).json({
			error: true,
			message: "Unauthorized user!",
		});
	}
	Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({
				error: true,
				message: "Invalid Token",
			});
		}
		req.user = user;
		next();
	});
};

export { register, verify, logIn, logOut, getToken, authenticate };
