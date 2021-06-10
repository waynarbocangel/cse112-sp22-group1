/**
 * Server
 * @module server
 */

const express = require("express");

const app = express();

/**
 * Gets static directory name
 */
app.use(express.static(__dirname));

/**
 * Listening to the server port 8080
 */
app.listen("8080", () => {
	console.log("server has started listening to port 8080");
});

/**
 * Gets login page up from login.html
 */
app.get("/login", (req, res) => {
	res.sendFile(__dirname + "/login/login.html");
});

/**
 * Gets the testers page up from testers.html
 */
app.get("/testers", (req, res) => {
	res.sendFile(__dirname + "/testers.html");
});

/**
 * Gets the home page up from index.html
 */
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

/**
 * Successfully redirects from /success to / with login
 */
app.get("/success", (req, res) => {
	res.redirect("/");
});
