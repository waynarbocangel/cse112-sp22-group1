require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function makeSignifier (userID, meaning, symbol) {
	const signifierObject = {
		meaning: meaning,
		symbol: symbol
	};

	if (Users.exists({ _id: userID })) {
		process.env.DB.Users.find({_id: userId}).signifiers.push(signifierObject);
	} else {
		return console.log("error: the user does not exist!");
	}
}

module.exports = {
	makeSignifier: makeSignifier
}
