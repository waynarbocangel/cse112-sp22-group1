require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function makeDailyLogPouch (userID, parent, content, dailyLength, trackers) {
	const dailyObject = {
		date: Date(),
		parent: parent,
		content: content,
		days: dailyLength,
		trackers: trackers
	};

	if (Users.exists({ _id: userID })) {
		process.env.DB.Users.find({_id: userId}).dailyLogs.push(dailyObject);
	} else {
		return console.log("error: the user does not exist!");
	}
}

module.exports = {
	makeDailyLog: makeDailyLog
}
