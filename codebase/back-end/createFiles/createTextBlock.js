require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function makeTextBlock (userID, parent, kind, text, signifier) {
	const textBlockObject = {
		parent: parent,
		kind: kind,
		text: text,
		signifier: signifier
	};

	if (Users.exists({ _id: userID })) {
		process.env.DB.Users.find({_id: userId}).textBlocks.push(textBlockObject);
	} else {
		return console.log("error: the user does not exist!");
	}
}

module.exports = {
	makeTextBlock: makeTextBlock
}
