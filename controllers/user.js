import User from "../models/user.js";
import Hazard from "../models/hazard.js";

const profile = (req, res) => {
	User.findOne({ userId: req.user.userId }, function (err, user) {
		if (err) return res.status(500).json({ error: true, message: err });
		return res.status(200).json({
			userId: user.userId,
			companyName: user.companyName,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			mobileNumber: user.mobileNumber,
			state: user.state,
			country: user.country,
			industry: user.industry,
			department: user.department,
			postCount: user.postCount,
			saved: user.saved,
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
	Hazard.findOne({ hazardId: req.body.hazardId }, function (err, doc) {
		if (err) return res.status(500).json({ error: true, message: err });
		if (!doc) return res.status(404).json({ error: true, message: "Hazard Not found." });
		const id = doc._id;
		User.updateOne({ userId: req.user.userId }, { $push: { saved: id } }, function (err, doc) {
			if (err) return res.status(500).json({ error: true, message: err });
			if (!doc.matchedCount) return res.status(404).json({ error: true, message: "User not found!" });
			if (!doc.modifiedCount) return res.status(409).json({ error: true, message: "No changes!" });
			return res.status(200);
		});
	});
};

const deleteFromSavedPosts = (req, res) => {
	Hazard.findOne({ hazardId: req.body.hazardId }, function (err, doc) {
		if (err) return res.status(500).json({ error: true, message: err });
		if (!doc) return res.status(404).json({ error: true, message: "Hazard Not found." });
		const id = doc._id;
		User.updateOne({ userId: req.user.userId }, { $pull: { saved: id } }, function (err, doc) {
			if (err) return res.status(500).json({ error: true, message: err });
			if (!doc.matchedCount) return res.status(404).json({ error: true, message: "User not found!" });
			if (!doc.modifiedCount) return res.status(409).json({ error: true, message: "No changes!" });
			return res.status(200);
		});
	});
};

export { profile, updateProfile, addToSavedPosts, deleteFromSavedPosts };
