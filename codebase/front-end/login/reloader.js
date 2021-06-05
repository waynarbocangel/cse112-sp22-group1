import {readUser} from "../localStorage/userOperations.js";

readUser((user) => {
	console.log(user);
	if (user.email !== undefined) {
		window.location.href = "http://localhost:8080/success";
	} else {
		console.log(user);
	}
});
