const dotnev = require("dotenv").config();
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const user_schema = {
    user_data: {
	    email: String, 
	    pwd: String
    },
    daily_log: {
        pid: String, 
        date: Date, 
        parent: String, 
        content: [String], 
        days: [String], 
        trackers: [String]
    },
    monthly_log: {
        pid: String, 
        parent: String, 
        date: Date, 
        content: [String], 
        days: [String], 
        trackers: [String]
    },
    future_log: {
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
    textblocks: {
        pid: String, 
        parent: String, 
        kind: String, 
        text: String, 
        signifier: String
    },
    eventblocks: {
        pid: String, 
        parent: String, 
        text: String, 
        date: Date, 
        signifier: String
    },
    taskblocks: {
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

const User = new mongoose.Schema(user_schema);
module.exports = {
	User: mongoose.model('User', User)
};
