// Removed readUser and deleteDB from import because eslint complained they're never used
import {createUser, db, loginUser} from "../localStorage/userOperations.js";
import {createUserPouch} from "../localStorage/createFiles/createUser.js";
let email = document.getElementById("email-field");
let password = document.getElementById("password-field");
let logIn = document.getElementById("login-form-submit");
let createAccount = document.getElementById("login-form-create");

document.onsubmit = (e) => {
	console.log(e);
	e.preventDefault();
}

logIn.onclick = (e) => {
	e.preventDefault();
	if (email.value === "") {
		alert("You need to fill in the email field");
	} else if (password.value === "") {
		alert("You need to fill in the password field");
	} else {
		loginUser(email.value, password.value, (user) => {
			if (user.error !== undefined) {
				alert(user.error);
			} else if (user.email !== undefined) {
				user.pwd = password.value;
				console.log(user.index);
				createUserPouch(db, user, (userData) => {
					console.log(userData);
					window.location.href = "http://localhost:8080/success";
				});
			} else {
				alert("Wrong username or password");
			}
		});
	}
};

createAccount.onclick = (e) => {
	e.preventDefault();
	if (email.value === "") {
		alert("You need to fill in the email field");
	} else if (password.value === "") {
		alert("You need to fill in the password field");
	} else {
		createUser(email.value, password.value, (user) => {
			console.log(user);
			if (user.error !== undefined) {
				alert(user.error);
			} else if (user.email !== undefined) {
				user.pwd = password.value;
				console.log(user.index);
				createUserPouch(db, user, (userData) => {
					console.log(userData);
					window.location.href = "http://localhost:8080/success";
				});
			} else {
				alert("Wrong username or password");
			}
		});
	}
};
