/**
 * Schema
 * @module schema
 */
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

/**
 * @typedef {Object} DailyLog
 * @property {String} id The daily log's id
 * @property {String} objectType The type of object
 * @property {Date} date Date of the daily log
 * @property {String} parent ID of the parent
 * @property {Array<String>} content List of id's of textBlocks in the log
 * @property {Array<String>} trackers List of id's of trackers in the log
 */

/**
 * @typedef {Object} Index
 * @property {String} objectType The type of object
 * @property {Array<String>} contents List of id's of futureLogs and collections
 */

/**
 * @typedef {Object} MonthlyLog
 * @property {String} id The monthly log's id
 * @property {String} objectType The type of object
 * @property {String} parent ID of the parent
 * @property {Date} date The month date
 * @property {Array<Day>} days List of days in log
 * @property {Array<String>} trackers List of id's of trackers in days
 */

/**
 * @typedef {Object} FutureLog
 * @property {String} id The future log's id
 * @property {String} objectType The type of object
 * @property {Date} startDate The future log start date
 * @property {Date} endDate The future log end date
 * @property {Array<Month>} months List of months in log
 * @property {Array<String>} trackers List id's of trackers in days
 */

/**
 * @typedef {Object} Tracker
 * @property {String} id The tracker's id
 * @property {String} objectType The type of object
 * @property {String} parent ID of the parent
 * @property {Array<String>} content List of id's of textBlocks in the tracker
 * @property {String} title Title of the tracker
 */

/**
 * @typedef {Object} Collection
 * @property {String} id The collection's id
 * @property {String} objectType The type of object
 * @property {String} parent The id of the parent
 * @property {String} title The collection's title
 * @property {Array<String>} content List of id's of the textBlocks in collection
 */

/**
 * @typedef {Object} ImageBlock
 * @property {String} id The imageBlock's id
 * @property {String} objectType The type of object
 * @property {String} parent Id of the parent
 * @property {String} arrangement Arrangement of imageBlock
 * @property {Buffer} data image as a buffer
 */

/**
 * @typedef {Object} AudioBlock
 * @property {String} id The audioBlock's id
 * @property {String} objectType The type of object
 * @property {String} parent Id of the parent
 * @property {String} arrangement Arrangement of audioBlock
 * @property {Buffer} data audio as a buffer
 */

/**
 * @typedef {Object} TextBlock
 * @property {String} id The textBlock's id
 * @property {String} objectType The type of object
 * @property {Number} tabLevel the tab level of the textBlock
 * @property {String} parent Id of the parent
 * @property {String} subParent Id of the child within the parent's content list.
 * @property {String} kind textBlock identifier for event and task creation
 * @property {String} objectReference id of the task or event or null if kind not either of those
 * @property {String} text the text inside textBlock
 * @property {String} signifier id of the signifier for this textBlock
 */

/**
 * @typedef {Object} Event
 * @property {String} id The event's id
 * @property {String} objectType The type of object
 * @property {String} title title of the event
 * @property {String} parent id of the parent
 * @property {Date} date date of the event (optional)
 * @property {String} signifier id of the signifier for the event
 */

/**
 * @typedef {Object} Task
 * @property {String} id The task's id
 * @property {String} objectType The type of object
 * @property {String} parent id of the parent
 * @property {String} text task description
 * @property {Number} complete non zero if task complete
 * @property {String} signifier id of the signifier for the task
 */

/**
 * @typedef {Object} Signifier
 * @property {String} id The signifier's id
 * @property {String} objectType The type of object
 * @property {String} meaning meaning of the signifier
 * @property {String} symbol the signifier symbol
 */

/**
 * @typedef userSchema
 * @property {String} email The user's email
 * @property {String} pwd The user's password
 * @property {String} teme The user's theme
 * @property {Index} index The user's index
 * @property {Array<DailyLog>} dailyLogs An array of the user's dailyLogs
 * @property {Array<MonthlyLog>} monthlyLogs An array of the user's monthlyLogs
 * @property {Array<FutureLog>} futureLogs An array of the user's futureLogs
 * @property {Array<Tracker>} trackers An array of the user's trackers
 * @property {Array<Collection>} collections An array of the user's collections
 * @property {Array<ImageBlock>} imageBlocks An array of the user's imageBlocks
 * @property {Array<AudioBlock>} audioBlocks An array of the user's audioBlocks
 * @property {Array<TextBlock>} textBlocks An array of the user's textBlocks
 * @property {Array<Task>} tasks An array of the user's tasks
 * @property {Array<Event>} events An array of the user's events
 * @property {Array<Signifier>} signifiers An array of the user's signifiers
 */
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
			days: [
				{
					id: String,
					content: [String],
					dailyLog: String
				}
			],
			trackers: [String]
		}
	],
	futureLogs: [
		{
			id: String,
			objectType: String,
			startDate: Date,
			endDate: Date,
			months: [
				{
					id: String,
					content: [String],
					monthlyLog: String
				}
			],
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
	imageBlocks: [
		{
			id: String,
			objectType: String,
			parent: String,
			arrangement: String,
			data: Buffer
		}
	],
	audioBlocks: [
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
	User: mongoose.model("User", User),
};
