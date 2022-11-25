import Hazard from "../models/hazard.js";
import User from "../models/user.js";
import { sendEmail } from "../utils/mail.js";
import { v4 } from "uuid";

const createHazard = (req, res) => {
	User.findOne({ userId: req.user.userId }, function (err, user) {
		if (err) return res.status(500).json({ error: true, message: err });
		if (!user) return res.status(404).json({ error: true, message: "User not found!" });
		const newHazard = new Hazard({
			userId: req.user.userId,
			hazardId: v4(),
			type: req.body.type,
			industry: req.body.industry,
			department: req.body.department,
			hazardLevel: req.body.hazardLevel,
			effectDuration: parseFloat(req.body.effectDuration / 24).toFixed(3),
			problem: req.body.problem,
			solution: req.body.solution,
			dateOccurred: req.body.dateOccurred,
			dateShared: new Date().toISOString(),
			isPublic: req.body.isPublic,
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

// import data from "../HazGuard.json" assert { type: "json" };
// const createManyHazard = () => {
// 	data.forEach((element) => {
// 		const newHazard = new Hazard({
// 			userId: element.userId,
// 			hazardId: element.hazardId,
// 			type: element.type,
// 			industry: element.industry,
// 			department: element.department,
// 			hazardLevel: element.hazardLevel,
// 			effectDuration: parseFloat(element.effectDuration / 24),
// 			problem: element.problem,
// 			solution: element.solution,
// 			dateOccurred: element.dateOccurred,
// 			dateShared: new Date().toISOString(),
// 			views: element.views,
// 			isPublic: element.isPublic,
// 			companyName: element.companyName,
// 			state: element.state,
// 			country: element.country,
// 		});
// 		newHazard.save((err, doc) => {
// 			if (err) return console.log(err);
// 		});
// 	});
// };
// createManyHazard();
// https://www.mockaroo.com/be8a0270

export { createHazard };
