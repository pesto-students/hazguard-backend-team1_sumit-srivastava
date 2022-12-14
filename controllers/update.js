import Hazard from "../models/hazard.js";

const updateHazard = (req, res) => {
	Hazard.updateOne(
		{ hazardId: req.body.hazardId },
		{
			$set: {
				type: req.body.type,
				industry: req.body.industry,
				hazardLevel: req.body.hazardLevel,
				effectDuration: parseFloat(req.body.effectDuration / 24).toFixed(1),
				problem: req.body.problem,
				solution: req.body.solution,
				dateOccured: req.body.dateOccured,
				isPublic: req.body.isPublic,
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

export { updateHazard, increaseViewCount };
