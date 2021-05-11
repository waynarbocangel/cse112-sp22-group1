const dotnev = require("dotenv").config();
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const userSchema = {
    userData: {
	    email: String, 
	    pwd: String
    },
    dailyLog: {
        pid: String, 
        date: Date, 
        parent: String, 
        content: [String], 
        days: [String], 
        trackers: [String]
    },
    monthlyLog: {
        pid: String, 
        parent: String, 
        date: Date, 
        content: [String], 
        days: [String], 
        trackers: [String]
    },
    futureLog: {
        pid: String, 
        startdate: Date, 
        enddate: Date, 
        months: [String], 
        content: [String], 
        trackers: [String]
    },
    trackers: {
        pid: String, 
        content: [String], 
        parent: String
    },
    collections: {
        title: String, 
        parent: String, 
        content: [String]
    },
    textBlocks: {
        pid: String, 
        parent: String, 
        kind: String, 
        text: String, 
        signifier: String
    },
    eventBlocks: {
        pid: String, 
        parent: String, 
        text: String, 
        date: Date, 
        signifier: String
    },
    taskBlocks: {
        pid: String, 
        parent: String, 
        text: String, 
        complete: Number, 
        signifier: String
    },
    signifiers: {
        pid: String, 
        meaning: String, 
        symbol: String
    }
};

const User = new mongoose.Schema(userSchema);
module.exports = {
	User: mongoose.model('Users', User)
};
