import User from "../models/user.js";
import Hazard from "../models/hazard.js";

const profile = (req, res) => {
	User.findOne({ userId: req.user.userId }, function (err, user) {
		if (err) return res.status(500).json({ error: true, message: err });
		if (!user) return res.status(404).json({ error: true, message: "User not found!" });
		return res.status(200).json({
			userId: user.userId,
			companyName: user.companyName,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			profilePicture: user.profilePicture,
			mobileNumber: user.mobileNumber,
			state: user.state,
			country: user.country,
			industry: user.industry,
			department: user.department,
			postCount: user.postCount,
			saved: user.saved,
			subscriptionType: user.subscriptionType,
		});
	});
};

const updateProfile = (req, res) => {
	User.updateOne(
		{ userId: req.user.userId },
		{
			$set: {
				companyName: req.body.companyName,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				profilePicture: req.body.profilePicture,
				mobileNumber: req.body.mobileNumber,
				state: req.body.state,
				country: req.body.country,
				industry: req.body.industry,
				department: req.body.department,
			},
		},
		function (err, doc) {
			if (err) return res.status(500).json({ error: true, message: err });
			if (!doc.matchedCount) return res.status(404).json({ error: true, message: "User not found!" });
			if (!doc.modifiedCount) return res.status(409).json({ error: true, message: "No changes!" });
			return res.status(200).json({
				message: "User updated succesfully.",
			});
		}
	);
};

const addToSavedPosts = (req, res) => {
	Hazard.findById(req.body._id, function (err, doc) {
		if (err) return res.status(500).json({ error: true, message: err });
		if (!doc) return res.status(404).json({ error: true, message: "Hazard Not found." });
		User.updateOne({ userId: req.user.userId }, { $push: { saved: req.body._id } }, function (err, doc) {
			if (err) return res.status(500).json({ error: true, message: err });
			if (!doc.matchedCount) return res.status(404).json({ error: true, message: "User not found!" });
			if (!doc.modifiedCount) return res.status(409).json({ error: true, message: "No changes!" });
			return res.status(200).json({ message: "saved successfully" });
		});
	});
};

const deleteFromSavedPosts = (req, res) => {
	Hazard.findById(req.body._id, function (err, doc) {
		if (err) return res.status(500).json({ error: true, message: err });
		if (!doc) return res.status(404).json({ error: true, message: "Hazard Not found." });
		User.updateOne({ userId: req.user.userId }, { $pull: { saved: req.body._id } }, function (err, doc) {
			if (err) return res.status(500).json({ error: true, message: err });
			if (!doc.matchedCount) return res.status(404).json({ error: true, message: "User not found!" });
			if (!doc.modifiedCount) return res.status(409).json({ error: true, message: "No changes!" });
			return res.status(200).json({ message: "unsaved successfully" });
		});
	});
};

export { profile, updateProfile, addToSavedPosts, deleteFromSavedPosts };
