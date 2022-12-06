import User from "../models/user.js";
import Hazard from "../models/hazard.js";

const readAllHazards = (req, res) => {
	Hazard.find(function (err, doc) {
		if (err) return res.status(500).json({ error: true, message: err });
		if (!doc.length) return res.status(200).json({ error: true, message: "No hazards available!" });
		return res.status(200).json({
			data: doc,
		});
	});
};

const leaderboardData = (req, res) => {
	User.find(function (err, doc) {
		if (err) return res.status(500).json({ error: true, message: err });
		if (!doc.length) return res.status(404).json({ error: true, message: "No companies available!" });
		return res.status(200).json({
			data: doc.map((data) => {
				return { _id: data._id, userId: data.userId, companyName: data.companyName, postCount: data.postCount, country: data.country };
			}),
		});
	});
};

export { readAllHazards, leaderboardData };
