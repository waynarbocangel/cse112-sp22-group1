// import {readUserPouch} from "./localStorage/readFiles.readUser.js";
export const router = {};
import * as localStorage from "./localStorage/userOperations.js";

router.setState = function(state, prev) {
    let url = "";
	console.log(state);
    let body = document.querySelector("body");
    body.className = "";
	let pageNumber = 1;
    let title = document.querySelector("title_page h1");
    console.log(title);

    if(state.name == "index" || state == null) {
        title.innerText = "Index";
    
        url = window.location.origin;
    }
    else if(state.name == "daily_log") {
        title.innerText = userObject.dailyLogs;
		pageNumber = 2;
        url = "#daily_log";
    }
    else if(state.name == "monthly_log") {
        title.innerText = userObject.monthlyLogs;
		pageNumber = 3;
        url = "#monthly_log";
    }
    else if(state.name == "future_log") {
        title.innerText = userObject.futureLogs;
        pageNumber = 4;
        url = "#future_log";
    }

	history.pushState({page: pageNumber}, title.innerText, url);
}