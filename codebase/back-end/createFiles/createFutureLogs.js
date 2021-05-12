require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function makeFutureLog (userID, startDate, endDate, [content], monthlyLength, [trackers]) {	
	const futureObject = {
		startDate: startDate,
		endDate: endDate,
		content: content,
		months: monthlyLength,
		trackers: trackers
	};

	if (Users.exists({ _id: userID })) {
		process.env.DB.Users.find({_id: userId}).futureLogs.push(futureObject);
	} else {
		return console.log("error: the user does not exist!");
	}
}

module.exports = {
	makeFutureLog: makeFutureLog
}
