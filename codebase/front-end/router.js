import * as localStorage from "./localStorage/userOperations.js";
import {fade, unfade} from "./transitions.js";
import {setupIndex, setupDailyLog, setupMonthlyLog, setupFutureLog, navbar, header, trackerMenu, url, pageNumber, getCurrentObject} from "./index.js";

export const router = {};
export let state = "";

router.setState = function(newState, prev) {
	getCurrentObject(newState);
	state = newState;
	setTimeout(() => {
		trackerMenu.clear();
		while(document.getElementById("contentWrapper").childNodes.length > 0){
			document.getElementById("contentWrapper").removeChild(document.getElementById("contentWrapper").childNodes[0]);
		}
		let body = document.querySelector("body");
		body.className = "";
		let content = document.querySelector("body");
		let btn = navbar.shadowRoot.querySelectorAll("button");
		
		fade(content, () => {
			localStorage.readUser((user) => {

				//index page
				if(state == null || state == "#index" || state =='') {
					setupIndex(header, btn);
				}
				else if(state.includes("#dailyLog")) {
					setupDailyLog(header, btn, newState);
				}
				else if(state.includes("#monthlyLog")) {
					setupMonthlyLog(header, btn, newState);
				}
				else if(state.includes("#futureLog")) {
					setupFutureLog(header, btn, newState);
				}
				if (!prev){
					history.pushState({page: pageNumber}, "", url);
				}
				unfade(content, () => {});
			});
		});
	}, 150);
}
