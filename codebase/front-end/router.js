import * as localStorage from "./localStorage/userOperations.js";
import {fade, unfade} from "./transitions.js";
import {getCurrentObject, navbar, pageNumber, setupDailyLog, setupFutureLog, setupIndex, setupMonthlyLog, url} from "./index.js";

export const router = {};
export let state = "";

/**
 * Sets the new state based on the new url to render and the previous url.
 *
 * @param {String} newState The url to render.
 * @param {String} prev The url that was last rendered.
 */
function stateSwitch (newState, prev) {
	getCurrentObject(newState);
	state = newState;
	setTimeout(() => {
		if (document.getElementById("trackerWrapper").childNodes.length > 0) {
			document.getElementById("trackerWrapper").removeChild(document.getElementById("trackerWrapper").childNodes[0]);
		}
		while (document.getElementById("contentWrapper").childNodes.length > 0) {
			document.getElementById("contentWrapper").removeChild(document.getElementById("contentWrapper").childNodes[0]);
		}
		let body = document.querySelector("body");
		body.className = "";
		let content = document.querySelector("body");
		let btn = navbar.shadowRoot.querySelectorAll("button");

		fade(content, () => {
			localStorage.readUser((user) => {
				console.log(user);
				// Index page
				if (state === null || state === "#index" || state === "") {
					setupIndex(btn);
				} else if (state.includes("#dailyLog")) {
					setupDailyLog(btn, newState);
				} else if (state.includes("#monthlyLog")) {
					setupMonthlyLog(btn, newState);
				} else if (state.includes("#futureLog")) {
					setupFutureLog(btn, newState);
				}
				if (!prev) {
					history.pushState({page: pageNumber}, "", url);
				}
				unfade(content, () => {
					console.log("unfading the content");
				});
			});
		});
	}, 150);
}

router.setState = stateSwitch;
