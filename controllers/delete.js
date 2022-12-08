import Hazard from "../models/hazard.js";
import User from "../models/user.js";

const deleteHazard = (req, res) => {
	Hazard.deleteOne({ hazardId: req.body.hazardId }, function (err, doc) {
		if (err) return res.status(500).json({ error: true, message: err });
		if (!doc.deletedCount) return res.status(404).json({ error: true, message: "Hazard Not found!" });
		else {
			User.updateOne({ userId: req.user.userId }, { $inc: { postCount: -1 } }, function (err, doc) {
				if (err) return res.status(500).json({ error: true, message: err });
				if (!doc.matchedCount) return res.status(404).json({ error: true, message: "User not found!" });
				if (!doc.modifiedCount) return res.status(409).json({ error: true, message: "No changes!" });
			});
		}
		return res.status(200).json({ message: "Hazard Deleted!" });
	});
};

export { deleteHazard };
