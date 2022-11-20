import mongoose from "mongoose";
import crypto from "crypto";
import Jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const userSchema = mongoose.Schema({
	userId: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	companyName: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
		maxlength: 100,
		trim: true,
	},
	lastName: {
		type: String,
		required: false,
		maxlength: 100,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		lowercase: true,
	},
	mobileNumber: {
		type: Number,
		required: true,
		trim: true,
		unique: true,
	},
	state: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	industry: {
		type: String,
		required: true,
		enum: ["Agriculture", "Apparel", "Oil & Gas Production", "Construction", "Manufacturing", "Mining", "Forestry", "Shipping", "Transport", "Utilities"],
	},
	department: {
		type: String,
		required: true,
	},
	postCount: {
		type: Number,
		required: true,
		default: 0,
	},
	saved: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Hazards",
		},
	],
	hash: {
		type: String,
		default: "",
		required: true,
	},
	salt: {
		type: String,
		default: "",
		required: true,
	},
	status: {
		type: String,
		enum: ["Pending", "Active"],
		required: true,
		default: "Pending",
	},
	confirmationToken: {
		type: String,
		unique: true,
	},
});

userSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(16).toString("hex");
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
};

userSchema.methods.validPassword = function (password) {
	const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
	return this.hash === hash;
};

export default mongoose.model("User", userSchema);
