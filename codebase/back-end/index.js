const express = require("express");

const app = express();

app.get("/", (request, response) => {
	let man = {
		age: 50
	}

	response.send(man);
});

app.get("/ohboy", (req, res) =>{
	res.redirect("/");
});


app.post("/", (req, res) =>{

});

app.listen(3000, () => {
	console.log("I have started listening in the port 3000");
});