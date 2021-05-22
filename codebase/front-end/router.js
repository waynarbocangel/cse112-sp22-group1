import * as localStorage from "./localStorage/userOperations.js";
import {fade, unfade} from "./transitions.js";
import {setupIndex, setupDailyLog, setupMonthlyLog, setupFutureLog, navbar, header, url, pageNumber, getCurrentObject} from "./index.js";

export const router = {};
export let state = "";

router.setState = function(newState, prev) {
	getCurrentObject(newState);
	state = newState;
	setTimeout(() => {
		if (document.getElementById("trackerWrapper").childNodes.length > 0) {
			document.getElementById("trackerWrapper").removeChild(document.getElementById("trackerWrapper").childNodes[0]);
		}
		while(document.getElementById("contentWrapper").childNodes.length > 0){
			document.getElementById("contentWrapper").removeChild(document.getElementById("contentWrapper").childNodes[0]);
		}
		let body = document.querySelector("body");
		body.className = "";
		let content = document.querySelector("body");
		let btn = navbar.shadowRoot.querySelectorAll("button");
		
		fade(content, () => {
			localStorage.readUser((user) => {
				let title = header.shadowRoot.getElementById("title_page");

				//index page
				if(state == null || state == "#index" || state =='') {
					setupIndex(title, btn);
				}
				else if(state.includes("#daily_log")) {
					setupDailyLog(title, btn);
				}
				else if(state.includes("#monthly_log")) {
					setupMonthlyLog(title, btn);
				}
				else if(state.includes("#future_log")) {
					setupFutureLog(title, btn);
				}
				if (!prev){
					history.pushState({page: pageNumber}, title.innerText, url);
				}
				unfade(content, () => {});
			});
		});
	}, 150);
}
