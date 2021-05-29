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
			for(let i = 0; i < userObject.collections.length; i++){
				let collection = userObject.collection[i];
				collection.title = security.encrypt(collection.title, userObject.pwd);
				newCollections.push(collection);
			}
			let newTextBlocks = [];
			for(let i = 0; i < userObject.textBlocks.length; i++){
				let block = userObject.textBlocks[i];
				block.text = security.encrypt(block.text, userObject.pwd);
				newTextBlocks.push(block);
			}
			let newTasks = [];
			for(let i = 0; i < userObject.tasks.length; i++){
				let block = userObject.tasks[i];
				block.text = security.encrypt(block.text, userObject.pwd);
				newTasks.push(block);
			}
			let newEvents = [];
			for(let i = 0; i < userObject.events.lenght; i++){
				let block = userObject.events[i];
				block.text = security.encrypt(block.text, userObject.pwd);
				newEvents.push(block);
			}
			let newSignifiers = [];
			for(let i = 0; i < userObject.signifiers.lenght; i++){
				let signifier = userObject.signifiers[i];
				signifier.text = security.encrypt(signifier.meaning, userObject.pwd);
				newSignifiers.push(signifier);
			}
			user.email = userObject.email;
			user.dailyLogs =  userObject.dailyLogs;
			user.monthlyLogs = userObject.monthlyLogs;
			user.futureLogs = userObject.futureLogs;
			user.collections = newCollections;
			user.trackers = userObject.trackers;
			user.textBlocks = newTextBlocks;
			user.tasks = newTasks;
			user.events = newEvents;
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
