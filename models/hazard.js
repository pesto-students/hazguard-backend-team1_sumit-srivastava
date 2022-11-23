import mongoose from "mongoose";

const hazardSchema = mongoose.Schema({
	userId: {
		type: String,
		required: true,
		trim: true,
	},
	hazardId: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	type: {
		type: String,
		required: true,
		enum: ["Safety", "Biological", "Physical", "Chemical"],
	},
	industry: {
		type: String,
		required: true,
		enum: ["Agriculture", "Apparel", "Oil & Gas Production", "Construction", "Manufacturing", "Mining", "Forestry", "Shipping", "Transport", "Utilities"],
	},
	hazardLevel: {
		type: String,
		required: true,
		enum: ["Low", "Moderate", "High"],
	},
	effectDuration: {
		type: String,
		required: true,
		default: "0 days",
	},
	problem: {
		type: String,
		required: true,
	},
	solution: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	views: {
		type: Number,
		required: true,
		default: 0,
	},
	isDeleted: {
		type: Boolean,
		required: true,
		default: false,
	},
	companyName: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
});

export default mongoose.model("Hazard", hazardSchema);
