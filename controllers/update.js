import Hazard from "../models/hazard.js";

const updateHazard = (req, res) => {
	Hazard.updateOne(
		{ hazardId: req.body.hazardId },
		{
			$set: {
				type: req.body.type,
				industry: req.body.industry,
				hazardLevel: req.body.hazardLevel,
				effectDuration: req.body.effectDuration,
				problem: req.body.problem,
				solution: req.body.solution,
				dateOccured: req.body.dateOccured,
				dateShared: req.body.dateShared,
			},
		},
		function (err, doc) {
			if (err) return res.status(500).json({ error: true, message: err });
			if (!doc.matchedCount) return res.status(404).json({ error: true, message: "Hazard not found!" });
			if (!doc.modifiedCount) return res.status(409).json({ error: true, message: "No changes!" });
			return res.status(200).json({
				message: "Hazard updated succesfully.",
			});
		}
	);
};

const setHazardVisibilityTrue = (req, res) => {
	Hazard.updateOne(
		{ hazardId: req.body.hazardId },
		{
			$set: {
				isPublic: true,
			},
		},
		function (err, doc) {
			if (err) return res.status(500).json({ error: true, message: err });
			if (!doc.matchedCount) return res.status(404).json({ error: true, message: "Hazard not found!" });
			if (!doc.modifiedCount) return res.status(409).json({ error: true, message: "No changes!" });
			return res.status(200).json({
				message: "Hazard is public!",
			});
		}
	);
};

const setHazardVisibilityFalse = (req, res) => {
	Hazard.updateOne(
		{ hazardId: req.body.hazardId },
		{
			$set: {
				isPublic: false,
			},
		},
		function (err, doc) {
			if (err) return res.status(500).json({ error: true, message: err });
			if (!doc.matchedCount) return res.status(404).json({ error: true, message: "Hazard not found!" });
			if (!doc.modifiedCount) return res.status(409).json({ error: true, message: "No changes!" });
			return res.status(200).json({
				message: "Hazard is hidden!",
			});
		}
	);
};

const increaseViewCount = (req, res) => {
	Hazard.updateOne(
		{ hazardId: req.body.hazardId },
		{
			$inc: {
				views: 1,
			},
		},
		function (err, doc) {
			if (err) return res.status(500).json({ error: true, message: err });
			if (!doc.matchedCount) return res.status(404).json({ error: true, message: "Hazard not found!" });
			if (!doc.modifiedCount) return res.status(409).json({ error: true, message: "No change done!" });
			return res.status(200).json({
				message: "Increased",
			});
		}
	);
};

export { updateHazard, setHazardVisibilityTrue, setHazardVisibilityFalse, increaseViewCount };
