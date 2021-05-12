require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function makeTaskBlock (userID, parent, text, complete, signifier) {
	const taskBlockObject = {
		parent: parent,
		text: text,
		complete: complete,
		signifier: signifier
	};

	if (Users.exists({ _id: userID })) {
		process.env.DB.Users.find({_id: userId}).taskBlocks.push(taskBlockObject);
	} else {
		return console.log("error: the user does not exist!");
	}
}

module.exports = {
	makeTaskBlock: makeTaskBlock
}
