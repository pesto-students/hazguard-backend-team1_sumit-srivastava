import mongoose from "mongoose";
import crypto from "crypto";
import * as dotenv from "dotenv";

dotenv.config();

const userSchema = mongoose.Schema({
	userId: {
		type: String,
		required: true,
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
	},
	lastName: {
		type: String,
		maxlength: 100,
		default: "",
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	profilePicture: {
		type: String,
		default: "",
	},
	mobileNumber: {
		type: String,
		trim: true,
		default: "",
	},
	state: {
		type: String,
		default: "",
	},
	country: {
		type: String,
		default: "",
	},
	industry: {
		type: String,
		enum: ["", "Agriculture", "Apparel", "Oil & Gas Production", "Construction", "Manufacturing", "Mining", "Forestry", "Shipping", "Transport", "Utilities"],
		default: "",
	},
	department: {
		type: String,
		default: "",
	},
	postCount: {
		type: Number,
		default: 0,
	},
	saved: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Hazards",
		},
	],
	subscriptionType: {
		type: String,
		enum: ["Free", "National", "International"],
		default: "Free",
	},
	hash: {
		type: String,
		default: "",
	},
	salt: {
		type: String,
		default: "",
	},
	status: {
		type: String,
		enum: ["Pending", "Active"],
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
