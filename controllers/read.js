import Hazard from "../models/hazard.js";

const readAllHazards = (req, res) => {
	Hazard.find({ isPublic: true }, function (err, doc) {
		if (err) return res.status(500).json({ error: true, message: err });
		if (!doc.length) return res.status(404).json({ error: true, message: "No hazards available!" });
		return res.status(200).json({
			data: doc,
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
