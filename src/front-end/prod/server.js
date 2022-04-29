const express = require("express");

const app = express();

app.use(express.static(__dirname + "/dist"));

app.listen("8080", () => {
	console.log("server has started listening to port 8080");
});

app.get("/login", (req, res) => {
	res.sendFile(__dirname + "/dist/login.html");
});

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/dist/index.html");
});

app.get("/success", (req, res) => {
	res.redirect("/");
});
