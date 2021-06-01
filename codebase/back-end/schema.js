require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const userSchema = {
	email: String,
	pwd: String,
	theme: String,
	index: {
		objectType: String,
		contents: [String]
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
			days: [{
				id: String,
				content: [String],
				dailyLog: [String]
			}],
			trackers: [String]
		}
	],
	futureLogs: [
		{
			id: String,
			objectType: String,
			startDate: Date,
			endDate: Date,
			months: [{
				id: String,
				content: [String],
				monthlyLog: [String]
			}],
			trackers: [String]
		}
	],
	trackers: [
		{
			id: String,
			objectType: String,
			title: String,
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
	imageBlocks:[
		{
			id: String,
			objectType: String,
			parent: String,
			arrangement: String,
			data: Buffer
		}
	],
	audioBlocks:[
		{
			id: String,
			objectType: String,
			parent: String,
			arrangement: String,
			data: Buffer
		}
	],
	textBlocks: [
		{
			id: String,
			objectType: String,
			tabLevel: Number,
			parent: String,
			subParent: String,
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
			title: String,
			parent: String,
			date: Date,
			signifier: String
		}
	],
	tasks: [
		{
			id: String,
			objectType: String,
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
