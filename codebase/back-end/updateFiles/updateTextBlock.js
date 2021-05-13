require("dotenv").config();
const mongoose = require("mongoose");

const schema = require(__dirname + "/../schema.js");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function updateTextBlock(userObject, callback){
	schema.User.findOne({email: userObject.email}, (error, user) => {
		if (error) {
			callback(error);
		} else {
			user.textBlocks = userObject.textBlocks;

			user.save((err, userObject) => {
				if (err) {
					callback(err);
				} else {
					callback(userObject);
				}
			});
		}
	});
}

module.exports = {
	updateTextBlock: updateTextBlock
};
