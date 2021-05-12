require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function makeEventBlock (userID, parent, text, date, signifier) {
	const eventBlockObject = {
		parent: parent,
		text: text,
		date: Date(),
		signifier: signifier
	};

	if (Users.exists({ _id: userID })) {
		process.env.DB.Users.find({_id: userId}).eventBlocks.push(eventBlockObject);
	} else {
		return console.log("error: the user does not exist!");
	}
}

module.exports = {
	makeEventBlock: makeEventBlock
}
