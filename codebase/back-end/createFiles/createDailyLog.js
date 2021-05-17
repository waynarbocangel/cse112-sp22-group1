require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function createDailyLogPouch (db, parent, content, dailyLength, trackers, callback) {
	var num = 0;
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			console.log(doc);
			num = doc.userObject.dailyLogs.length;
		}
	});
	
	const dailyObject = {
		id: num,
		date: Date(),
		parent: parent,
		content: content,
		days: dailyLength,
		trackers: trackers
	};

	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			db.put({_rev: doc._rev,
				_id: "0000"}, (res) => {
				doc.userObject.dailyLogs.push(dailyObject);
				console.log(res);
				callback(res);
			});
		}
	});
}

module.exports = {
	createDailyLogPouch: createDailyLogPouch
}
