require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function makeMonthlyLog (userID, parent, [content], dailyLength, [trackers]) {
	const monthlyObject = {
		parent: parent,
		date: Date(),
		content: content,
		days: dailyLength,
		trackers: trackers
	};

	if (Users.exists({ _id: userID })) {
		process.env.DB.Users.find({_id: userId}).monthlyLogs.push(monthlyObject);
	} else {
		return console.log("error: the user does not exist!");
	}
}

module.exports = {
	makeMonthlyLog: makeMonthlyLog
}
