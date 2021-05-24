require("dotenv").config();
const mongoose = require("mongoose");

const schema = require(__dirname + "/schema.js");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

//function makeUser (email, pwd) {
// edit & test for lint
var makeUser = function(email,pwd) {
	const userObject = {
		email: email,
		pwd: pwd
	};

	const newUser = new schema.User({
		userData: userObject
	});

	newUser.save((err, us) => {
		if (err) {
			return console.error(err);
		}
		return us;
	});
//}
};

module.exports = {
	makeUser: makeUser
}
