import Hazard from "../models/hazard.js";
import User from "../models/user.js";

const readAllHazards = (req, res) => {
	Hazard.find({ isPublic: true }, function (err, doc) {
		if (err) return res.status(500).json({ error: true, message: err });
		if (!doc.length) return res.status(404).json({ error: true, message: "No hazards available!" });
		User.findOne({ userId: req.user.userId }, function (err, user) {
			if (err) return res.status(500).json({ error: true, message: err });
			if (!user) return res.status(404).json({ error: true, message: "User not found!" });
			return res.status(200).json({
				data: doc.map((a) => {
					if (user.saved.includes(a._id)) {
						return { ...a._doc, isSaved: true };
					} else {
						return a;
					}
				}),
			});
		});
	});
};

const readAllHazardsOfUser = (req, res) => {
	Hazard.find({ userId: req.user.userId }, function (err, doc) {
		if (err) return res.status(500).json({ error: true, message: err });
		if (!doc.length) return res.status(404).json({ error: true, message: "No hazards available for user!" });
		return res.status(200).json({
			data: doc,
		});
	});
};

export { readAllHazards, readAllHazardsOfUser };
