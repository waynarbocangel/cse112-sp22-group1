import * as localStorage from "../localStorage/userOperations.js";
import { contentWrapper, header } from "../index.js";
import { CreatorBlock } from "../components/creator.jsx";
// Import { DropdownBlock } from "../components/dropdown.jsx";
import { FileLocation } from "../components/fileLocation.jsx";
import { Log } from "../components/log.jsx";
import { RightSidebar } from "../components/rightSidebar.jsx";
import { TrackerBlock } from "../components/trackerBlock.jsx";
import { TrackerMenu } from "../components/tracker.jsx";
// Import { createEditor } from "../components/blockController.js";


import { currentState } from "./stateManager.js";
/* eslint-disable */
/**
 * Sets up the futureLog page with the mothlyLogs, textBlocks, and trackers of the user.
 *
 * @param {Array} btn An array of the buttons in the futureLog page's navbar.
 */
export function setupFutureLog (btn) {

	/*
	 * LocalStorage.readUser((err, user) => {
	 * 	if (err) {
	 * 		console.log(err);
	 * 	} else {
	 * 	let userArr = user.monthlyLogs;
	 * 	console.log(currentState);
	 * 	let parentArr = [];
	 * 	for (let i = 0; i < currentState.months.length; i++) {
	 * 		Array.prototype.push.apply(parentArr, userArr.filter((object) => object.id === currentState.months[i].monthlyLog));
	 * 	}
	 */

		/*
		 * 	Let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		 * 	for (let i = 0; i < parentArr.length; i++) {
		 * 		let currentMonth = parentArr[i];
		 * 		let dropdownMonth = new DropdownBlock(`${monthNames[new Date(currentMonth.date).getMonth()]} ${new Date(currentMonth.date).getFullYear()}`, currentMonth, 1);
		 * 		contentWrapper.appendChild(dropdownMonth);
		 */

		/*
		 * 		If (i > 0) {
		 * 			dropdownMonth.titleWrapper.classList.add("singleItemWrapper");
		 * 		}
		 */

		// 		CreateEditor(dropdownMonth.contentWrapper, currentState, currentMonth.id, () => {
		// 			For (let k = 0; k < currentMonth.days.length; k++) {
		// 				Let currentDay = user.dailyLogs.filter((day) => day.id === currentMonth.days[k].dailyLog)[0];
		// 				Let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		// 				Let dropdownDay = new DropdownBlock(`${weekDays[new Date(currentDay.date).getDay()]}, ${monthNames[new Date(currentDay.date).getMonth()]} ${new Date(currentDay.date).getUTCDate()}`, currentDay, 2);
		// 				DropdownMonth.contentWrapper.appendChild(dropdownDay);
		// 				/* eslint-disable */
		// 				CreateEditor(dropdownDay.contentWrapper, currentMonth, currentDay.id, () => { });
		// 				/* eslint-enable */
		// 			}
		// 		});
		// 	}
		// 	ContentWrapper.appendChild(new CreatorBlock());
		// }
	// });
	// Document.getElementById("targetMenu").style.display = "block";
	// Let futureLogStart = new Date(currentState.startDate);
	// Let futureLogEnd = new Date(currentState.endDate);

	contentWrapper.appendChild(new Log(currentState));
	contentWrapper.appendChild(new RightSidebar());

	header.title = currentState.title// FutureLogEnd.getFullYear() === futureLogStart.getFullYear() ? `Future Log ${futureLogStart.getFullYear()}` : `Future Log ${futureLogStart.getFullYear()} - ${futureLogEnd.getFullYear()}`;
	// Remove all child fileLocations first first
	let child = header.file.lastElementChild;
	while (child) {
		header.file.removeChild(child);
		child = header.file.lastElementChild;
	}
	header.file.appendChild(new FileLocation(currentState.title, "futureLog", currentState.id, false));

	/*
	 * Setting navbar buttons
	 * for (let i = 0; i < btn.length; i++) {
	 * 	btn[i].removeAttribute("disabled");
	 * 	btn[i].style.visibility = "visible";
	 * }
	 */

	/*
	 * I have been told to just comment out these for right now
	 * Main purpose of these was previously to remove certain navbar icons
	 * but with the new nav bar it is no longer necessary.
	 *   navbar.single.setAttribute("disabled", "disabled");
	 *   navbar.single.style.visibility = "hidden";
	 *   navbar.double.setAttribute("disabled", "disabled");
	 *   navbar.double.style.visibility = "hidden";
	 *   navbar.singleMenu.setAttribute("disabled", "disabled");
	 *   navbar.singleMenu.style.visibility = "hidden";
	 *   navbar.doubleMenu.setAttribute("disabled", "disabled");
	 *   navbar.doubleMenu.style.visibility = "hidden";
	 */
	header.makeUneditable();
	let headerButtons = header.imgbuttons;
	for (let i = 0; i < headerButtons.length; i++) {
		headerButtons[i].classList.remove("hide");
	}

	let futureLogTrackerMenu = new TrackerMenu("Future Log Trackers");
	document.getElementById("trackerWrapper").appendChild(futureLogTrackerMenu);
	let trackerBlockWrapper = futureLogTrackerMenu.shadowRoot.getElementById("editor");

	localStorage.readUser((err, user) => {
		if (err) {
			console.log(err);
		} else {
			let userArr = user.trackers;
			let trackerArr = [];
			for (let i = 0; i < currentState.trackers.length; i++) {
				trackerArr.push(userArr.filter((object) => object.id === currentState.trackers[i])[0]);
			}
			console.log(trackerArr);
			setTimeout(() => {
				for (let i = 0; i < trackerArr.length; i++) {
					let currentTracker = trackerArr[i];
					let dropdownTracker = new TrackerBlock(currentTracker.title, currentState.id, currentTracker, futureLogTrackerMenu);
					trackerBlockWrapper.appendChild(dropdownTracker);
				}
				trackerBlockWrapper.appendChild(new CreatorBlock());
			}, 10);
		}
	});
}
/* eslint-enable */
