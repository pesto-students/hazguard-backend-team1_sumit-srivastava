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
			effectDuration: parseFloat(req.body.effectDuration / 24).toFixed(1),
			problem: req.body.problem,
			solution: req.body.solution,
			dateOccurred: req.body.dateOccurred,
			dateShared: new Date().toISOString(),
			isPublic: req.body.isPublic,
			companyName: req.body.companyName,
			state: req.body.state,
			country: req.body.country,
		});
		let data;
		newHazard.save((err, doc) => {
			data = doc;
			if (err) return res.status(500).json({ error: true, message: err });
		});
		user.postCount += 1;
		user.save((err, doc) => {
			if (err) return res.status(500).json({ error: true, message: err });
			sendEmail(user.firstName, user.email, newHazard, "hazard");
			return res.status(200).json({ message: "Hazard Saved!", data: data });
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
// 			effectDuration: parseFloat(element.effectDuration / 24).toFixed(1),
// 			problem: element.problem,
// 			solution: element.solution,
// 			dateOccurred: element.dateOccurred,
// 			dateShared: new Date().toISOString(),
// 			views: element.views,
// 			isPublic: element.isPublic,
// 			companyName: element.companyName,
// 			state: element.state,
// 			country: element.country,
// 			images: [
// 				"https://images.unsplash.com/photo-1611270418597-a6c77f4b7271?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=998&q=80",
// 				"https://images.unsplash.com/photo-1611174797136-5e167ea90d6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
// 				"https://images.unsplash.com/photo-1578995511335-b54ca0772e83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
// 				"https://images.unsplash.com/photo-1626114150511-de0231caa614?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
// 			],
// 		});
// 		newHazard.save((err, doc) => {
// 			if (err) return console.log(err);
// 		});
// 	});
// };
// createManyHazard();
// https://www.mockaroo.com/be8a0270

export { createHazard };
