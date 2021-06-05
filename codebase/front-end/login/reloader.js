import {readUser} from "../localStorage/userOperations.js";

readUser((err, user) => {
	if (err) {
		console.log(user);
	} else {
		window.location.href = "http://localhost:8080/success";
	}
});
