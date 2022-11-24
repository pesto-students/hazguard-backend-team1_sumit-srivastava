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
	department: {
		type: String,
		required: true,
	},
	hazardLevel: {
		type: String,
		required: true,
		enum: ["Low", "Moderate", "High"],
	},
	effectDuration: {
		type: Number,
		required: true,
	},
	problem: {
		type: String,
		required: true,
	},
	solution: {
		type: String,
		required: true,
	},
	dateOccured: {
		type: Date,
		required: true,
	},
	dateShared: {
		type: Date,
		required: true,
	},
	views: {
		type: Number,
		required: true,
		default: 0,
	},
	isPublic: {
		type: Boolean,
		required: true,
		default: true,
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
