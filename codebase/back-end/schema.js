require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const userSchema = {
	email: String,
	pwd: String,
	index: {
		objectType: String,
		contents: [String] //only futurelog and collection
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
			content: [String],
			days: [String],
			trackers: [String]
		}
	],
	futureLogs: [
		{
			id: String,
			objectType: String,
			startDate: Date,
			endDate: Date,
			months: [String],
			content: [String],
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
			kind: String,
			text: String,
			signifier: String
		}
	],
	eventBlocks: [
		{
			id: String,
			objectType: String,
			tabLevel: Number,
			parent: String,
			text: String,
			date: Date,
			signifier: String
		}
	],
	taskBlocks: [
		{
			id: String,
			objectType: String,
			tabLevel: Number,
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
