require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const userSchema = {
	email: String,
	pwd: String,
	index: {
		objectType: String,
<<<<<<< HEAD
		contents: [String] //only futurelog and collection
=======
		contents: [String]
>>>>>>> front-end_drop
	},
	dailyLogs: [
		{
			id: String,
			objectType: String,
			date: Date,
			parent: String,
			content: [String],
			trackers: [String]
		}
	],
	monthlyLogs: [
		{
			id: String,
			objectType: String,
			parent: String,
			date: Date,
<<<<<<< HEAD
			content: [String],
			days: [String],
=======
			days: [{
				id: String,
				content: [String],
				dailyLog: [String]
			}],
>>>>>>> front-end_drop
			trackers: [String]
		}
	],
	futureLogs: [
		{
			id: String,
			objectType: String,
			startDate: Date,
			endDate: Date,
<<<<<<< HEAD
			months: [String],
			content: [String],
=======
			months: [{
				id: String,
				content: [String],
				monthlyLog: [String]
			}],
>>>>>>> front-end_drop
			trackers: [String]
		}
	],
	trackers: [
		{
			id: String,
			objectType: String,
			content: [String],
			parent: String
		}
	],
	collections: [
		{
			id: String,
			objectType: String,
			title: String,
			parent: String,
			content: [String]
		}
	],
	textBlocks: [
		{
			id: String,
			objectType: String,
			tabLevel: Number,
			parent: String,
<<<<<<< HEAD
=======
			subParent: String,
>>>>>>> front-end_drop
			kind: String,
			objectReference: String,
			text: String,
			signifier: String
		}
	],
	events: [
		{
			id: String,
			objectType: String,
<<<<<<< HEAD
			tabLevel: Number,
=======
			title: String,
>>>>>>> front-end_drop
			parent: String,
			date: Date,
			signifier: String
		}
	],
	tasks: [
		{
			id: String,
			objectType: String,
<<<<<<< HEAD
			tabLevel: Number,
=======
>>>>>>> front-end_drop
			parent: String,
			text: String,
			complete: Number,
			signifier: String
		}
	],
	signifiers: [
		{
			id: String,
			objectType: String,
			meaning: String,
			symbol: String
		}
	]
};

const User = new mongoose.Schema(userSchema);
module.exports = {
	User: mongoose.model("User", User)
};
