require("dotenv").config();
const mongoose = require("mongoose");
const security = require(__dirname + "/../security/securityFunctions.js");
const schema = require(__dirname + "/../schema.js");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function updateUser(userObject, callback){
	console.log(userObject);
	schema.User.findOne({email: userObject.email}, (error, user) => {
		if (error) {
			callback(error);
		} else {
			let newCollections = [];
			for(let i = 0; i < userObject.collections.lenght; i++){
				let collection = userObject.collection[i];
				collection.title = security.encrypt(collection.title, userObject.pwd);
				newCollections.push(collection);
			}
			let newTextBlocks = [];
			for(let i = 0; i < userObject.textBlocks.lenght; i++){
				let block = userObject.textBlocks[i];
				block.text = security.encrypt(block.text, userObject.pwd);
				newTextBlocks.push(block);
			}
			let newTaskBlocks = [];
			for(let i = 0; i < userObject.taskBlocks.lenght; i++){
				let block = userObject.taskBlocks[i];
				block.text = security.encrypt(block.text, userObject.pwd);
				newTextBlocks.push(block);
			}
			let newEventBlocks = [];
			for(let i = 0; i < userObject.eventBlocks.lenght; i++){
				let block = userObject.eventBlocks[i];
				block.text = security.encrypt(block.text, userObject.pwd);
				newTextBlocks.push(block);
			}
			let newSignifiers = [];
			for(let i = 0; i < userObject.signifiers.lenght; i++){
				let signifier = userObject.signifiers[i];
				signifier.text = security.encrypt(signifier.meaning, userObject.pwd);
				newTextBlocks.push(signifier);
			}
			user.email = userObject.email;
			user.dailyLogs =  userObject.dailyLogs;
			user.monthlyLogs = userObject.monthlyLogs;
			user.futureLogs = userObject.futureLogs;
			user.collections = newCollections;
			user.trackers = userObject.trackers;
			user.textBlocks = newTextBlocks;
			user.taskBlocks = newTaskBlocks;
			user.eventBlocks = newEventBlocks;
			user.signifiers = newSignifiers;

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
	updateUser: updateUser
};
