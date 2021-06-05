import {readUser} from "../localStorage/userOperations.js";

readUser((err, user) => {
	if (!err) {
		window.location.href = "http://localhost:8080/success";
	} else {
		console.log(user);
	}
});
