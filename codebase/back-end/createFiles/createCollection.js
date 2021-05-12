require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function makeCollection (userID, title, parent, [content]) {
	const collectionObject = {
		title: title,
		parent: parent,
		content: content
	};

	if (Users.exists({ _id: userID })) {
		process.env.DB.Users.find({_id: userId}).collections.push(collectionObject);
	} else {
		return console.log("error: the user does not exist!");
	}
}

module.exports = {
	makeCollection: makeCollection
}
