import Hazard from "../models/hazard.js";
import User from "../models/user.js";
import { sendEmail } from "../utils/mail.js";
import { v4 } from "uuid";

const createHazard = (req, res) => {
	User.findOne({ userId: req.user.userId }, function (err, user) {
		if (err) return res.status(500).json({ error: true, message: err });
		if (!user) return res.status(404).json({ error: true, message: "User not found!" });
		const newHazard = new Hazard({
			userId: req.body.userId,
			hazardId: v4(),
			type: req.body.type,
			industry: req.body.industry,
			hazardLevel: req.body.hazardLevel,
			effectDuration: req.body.effectDuration,
			problem: req.body.problem,
			solution: req.body.solution,
			date: req.body.date,
			companyName: req.body.companyName,
			state: req.body.state,
			country: req.body.country,
		});
		newHazard.save((err, doc) => {
			if (err) return res.status(500).json({ error: true, message: err });
		});
		user.postCount += 1;
		user.save((err, doc) => {
			if (err) return res.status(500).json({ error: true, message: err });
			sendEmail(user.firstName, user.email, newHazard, "hazard");
			return res.status(200).json({ message: "Hazard Saved!" });
		});
	});
};

export { createHazard };
