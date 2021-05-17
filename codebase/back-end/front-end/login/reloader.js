import {readUser} from "../localStorage/userOperations.js";

readUser((user) => {
	console.log(user);
	if (user.email != undefined){
		window.location.href = "localhost:3000/success";
	} else {
		console.log(user);
	}
});