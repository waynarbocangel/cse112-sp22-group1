require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function makeTracker (userID, parent, [content]) {
	const trackerObject = {
		parent: parent,
		content: content
	};

	if (Users.exists({ _id: userID })) {
		process.env.DB.Users.find({_id: userId}).trackers.push(trackerObject);
	} else {
		return console.log("error: the user does not exist!");
	}
}

module.exports = {
	makeTracker: makeTracker
}
