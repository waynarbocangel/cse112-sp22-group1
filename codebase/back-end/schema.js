require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const userSchema = {
    userData: {
		email: String,
		pwd: String
    },
	dailyLogs: [{
		id: String,
		date: Date,
		parent: String,
		content: [String],
		days: [String],
		trackers: [String]
	}],
	monthlyLogs: [{
		id: String,
		parent: String,
		date: Date,
		content: [String],
		days: [String],
		trackers: [String]
	}],
	futureLogs: [{
		id: String,
		startDate: Date,
		endDate: Date,
		months: [String],
		content: [String],
		trackers: [String]
	}],
	trackers: [{
		id: String,
		content: [String],
		parent: String
	}],
	collections: [{
		id: String,
		title: String,
		parent: String,
		content: [String]
	}],
	textBlocks: [{
		id: String,
		parent: String,
		kind: String,
		text: String,
		signifier: String
	}],
	eventBlocks: [{
		id: String,
		parent: String,
		text: String,
		date: Date,
		signifier: String
	}],
	taskBlocks: [{
		id: String,
		parent: String,
		text: String,
		complete: Number,
		signifier: String
	}],
	signifiers: [{
		id: String,
		meaning: String,
		symbol: String
	}]
};

const User = new mongoose.Schema(userSchema);
module.exports = {
	User: mongoose.model("Users", User)
};
