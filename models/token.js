import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
	token: String,
});

export default mongoose.model("Token", tokenSchema);
