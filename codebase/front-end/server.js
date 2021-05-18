const express = require("express");

const app = express();

app.use(express.static(__dirname));

app.listen("8080", () => {
	console.log("server has started listening to port 3000");
});

app.get("/login", (req, res) => {
	res.sendFile(__dirname + "/login/login.html");
});

app.get("/success", (req, res) => {
	res.send("success");
});