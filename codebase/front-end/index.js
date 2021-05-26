import * as localStorage from "./localStorage/userOperations.js";
import { TrackerMenu } from "./components/tracker.js";
import { NavBar } from "./components/navbar.js";
import { PageHeader } from "./components/header.js";
import { DropdownBlock } from './components/dropdown.js';
import { router, state } from './router.js';
import { createEditor } from './components/blockController.js';

document.querySelector("body").style.display = "none";

export let navbar = new NavBar();
export let header = new PageHeader();
export let url = "";
export let pageNumber = 1;

export let currentObject;
let contentWrapper = document.getElementById("contentWrapper");

document.getElementById("topbar").appendChild(header);
document.getElementById("sidebar").appendChild(navbar);
router.setState(document.location.hash, false);

window.onpopstate = () => {
	router.setState(document.location.hash, true);
};

export function getCurrentObject(urlFromRouter) {
	let urlparse = undefined;
	let id = null;
	if (urlFromRouter != null){
		urlparse = urlFromRouter.split("~");
	}
	if (urlparse != undefined){
		id = urlparse[1];
	}
	localStorage.readUser((err, user) => {
		if (err) {
			window.location.href = "http://localhost:8080/login";
		} else {
			if (id != null){
				let userArr = [];
				Array.prototype.push.apply(userArr, user.dailyLogs);
				Array.prototype.push.apply(userArr, user.monthlyLogs);
				Array.prototype.push.apply(userArr, user.futureLogs);
				Array.prototype.push.apply(userArr, user.collections);
				let parsed = userArr.filter(object => object.id == id);
				currentObject = parsed[0];
			} else {
				currentObject = user.index;
			}
		}
	});

}

export function setupIndex(header, btn) {
	localStorage.readUser((err, user) => {
		if (err) {
			console.log(err);
		} else {
			let userArr = [];
			Array.prototype.push.apply(userArr, user.futureLogs);
			Array.prototype.push.apply(userArr, user.collections);

			let parentArr = [];
			for (let i = 0; i < currentObject.contents.length; i++) {
				Array.prototype.push.apply(parentArr, userArr.filter(object => object.id == currentObject.contents[i]));
			}

			let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

			for(let i = 0; i < parentArr.length; i++) {

				if (parentArr[i].objectType == "futureLog") {
					let futureLogStart = new Date(parentArr[i].startDate);
					let futureLogEnd = new Date(parentArr[i].endDate);
					let dropdown = new DropdownBlock(`Future Log ${monthNames[futureLogStart.getMonth()]} ${futureLogStart.getFullYear()} - ${monthNames[futureLogEnd.getMonth()]} ${futureLogEnd.getFullYear()}`, parentArr[i], 1);
					contentWrapper.appendChild(dropdown);

					for (let j = 0; j < parentArr[i].months.length; j++) {
						let currentMonth = user.monthlyLogs.filter(month => month.id == parentArr[i].months[j])[0];
						let dropdownMonth = new DropdownBlock(`${monthNames[new Date(currentMonth.date).getMonth()]} ${new Date(currentMonth.date).getFullYear()}`, currentMonth, 2);
						dropdown.contentWrapper.appendChild(dropdownMonth);
						for(let k = 0; k < currentMonth.days.length; k++) {
							let currentDay = user.dailyLogs.filter(day => day.id == currentMonth.days[k])[0];;
							let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
							let dropdownDay = new DropdownBlock(`${weekDays[new Date(currentDay.date).getDay()]}, ${monthNames[new Date(currentDay.date).getMonth()]} ${new Date(currentDay.date).getUTCDate()}`, currentDay, 3);
							dropdownMonth.contentWrapper.appendChild(dropdownDay);
						}
					}
				}
			}
		}
	});

	header.title = "Index";
	url = "/";
	pageNumber = 1;
		
	//setting navbar buttons      
	for(let i = 0; i<btn.length;i++)
	{
		btn[i].removeAttribute("disabled");
		btn[i].style.visibility = "visible";
	}

	createEditor(contentWrapper, (success) => {});
	navbar.target.setAttribute ("disabled", "disabled");
	navbar.target.style.visibility = "hidden";
	navbar.single.setAttribute ("disabled", "disabled");
	navbar.single.style.visibility = "hidden";
	navbar.double.setAttribute ("disabled", "disabled");
	navbar.double.style.visibility = "hidden";
	let headerButtons = header.shadowRoot.querySelectorAll(".imgbutton");
	for (let i = 0; i < headerButtons.length; i++){
		headerButtons[i].classList.add("hide");
	}
}

export function setupFutureLog(header, btn, newState){
	localStorage.readUser((err, user) => {
		if (err) {
			console.log(err);
		} else {
			let userArr = user.monthlyLogs;
			console.log(currentObject);
			let parentArr = [];
			for (let i = 0; i < currentObject.months.length; i++) {
				Array.prototype.push.apply(parentArr, userArr.filter(object => object.id == currentObject.months[i]));
			}

			let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			for(let i = 0; i < parentArr.length; i++) {
				let currentMonth = parentArr[i];
				let dropdownMonth = new DropdownBlock(`${monthNames[new Date(currentMonth.date).getMonth()]} ${new Date(currentMonth.date).getFullYear()}`, currentMonth, 1);
				contentWrapper.appendChild(dropdownMonth);
				console.log(currentMonth);
				for(let k = 0; k < currentMonth.days.length; k++) {
					let currentDay = user.dailyLogs.filter(day => day.id == currentMonth.days[k])[0];
					console.log(currentDay);
					console.log(new Date(currentDay.date));
					let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
					let dropdownDay = new DropdownBlock(`${weekDays[new Date(currentDay.date).getDay()]}, ${monthNames[new Date(currentDay.date).getMonth()]} ${new Date(currentDay.date).getUTCDate()}`, currentDay, 2);
					dropdownMonth.contentWrapper.appendChild(dropdownDay);
				}
			}
		}
	});
	console.log(currentObject);
	let futureLogStart = new Date(currentObject.startDate);
	let futureLogEnd = new Date(currentObject.endDate);
	header.title = (futureLogEnd.getFullYear() == futureLogStart.getFullYear()) ? `Future Log ${futureLogStart.getFullYear()}` : `Future Log ${futureLogStart.getFullYear()} - ${futureLogEnd.getFullYear()}`;
	pageNumber = 4;
	url = newState;
	//setting navbar buttons   
	for(let i = 0; i<btn.length;i++)
	{
		btn[i].removeAttribute("disabled");
		btn[i].style.visibility = "visible";
	}
	navbar.single.setAttribute ("disabled", "disabled");
	navbar.single.style.visibility = "hidden";
	navbar.double.setAttribute ("disabled", "disabled");
	navbar.double.style.visibility = "hidden";
	let headerButtons = header.shadowRoot.querySelectorAll(".imgbutton");
	for (let i = 0; i < headerButtons.length; i++){
		headerButtons[i].classList.remove("hide");
	}
	document.getElementById("trackerWrapper").appendChild(new TrackerMenu("Future Log Trackers"));
}

export function setupMonthlyLog(header, btn, newState){
	localStorage.readUser((err, user) => {
		if (err) {
			console.log(err);
		} else {
			let userArr = user.dailyLogs;

			let parentArr = [];
			for (let i = 0; i < currentObject.days.length; i++) {
				Array.prototype.push.apply(parentArr, userArr.filter(object => object.id == currentObject.days[i]));
			}

			let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			for(let i = 0; i < currentObject.days.length; i++) {
				let currentDay = parentArr[i];
				console.log(currentDay);
				console.log(new Date(currentDay.date));
				let dropdownDay = new DropdownBlock(`${weekDays[new Date(currentObject.date).getDay()]}, ${monthNames[new Date(currentDay.date).getMonth()]} ${new Date(currentDay.date).getUTCDate()}`, currentDay, 1);
				contentWrapper.appendChild(dropdownDay);
			}
		}
	});
	let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	header.title = `${monthNames[new Date(currentObject.date).getMonth()]} ${new Date(currentObject.date).getFullYear()}`;
	pageNumber = 3;
	url = newState;
	//setting navbar buttons   
	for(let i = 0; i<btn.length;i++)
	{
		btn[i].removeAttribute("disabled");
		btn[i].style.visibility = "visible";
	}
	navbar.double.setAttribute ("disabled", "disabled");
	navbar.double.style.visibility = "hidden";
	let headerButtons = header.shadowRoot.querySelectorAll(".imgbutton");
	for (let i = 0; i < headerButtons.length; i++){
		headerButtons[i].classList.remove("hide");
	}
	document.getElementById("trackerWrapper").appendChild(new TrackerMenu("Monthly Log Trackers"));
}

export function setupDailyLog(header, btn, newState){
	let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	header.title = `${weekDays[new Date(currentObject.date).getDay()]} ${monthNames[new Date(currentObject.date).getMonth()]} ${new Date(currentObject.date).getUTCDate()}, ${new Date(currentObject.date).getFullYear()}`;
	pageNumber = 2;
	url = newState;
	//setting navbar buttons                  
	for(let i = 0; i<btn.length;i++)
	{
		btn[i].removeAttribute("disabled");
		btn[i].style.visibility = "visible";
	}
	createEditor(contentWrapper, (success) => {
		console.log(success);
	});
	let headerButtons = header.shadowRoot.querySelectorAll(".imgbutton");
	for (let i = 0; i < headerButtons.length; i++){
		headerButtons[i].classList.remove("hide");
	}
	let tracker = new TrackerMenu("Daily Log Trackers");
	setTimeout(() => {
		let trackerContent = tracker.shadowRoot.getElementById('editor');
		createEditor(trackerContent, (success) => {
			console.log(success);
		});
		document.getElementById("trackerWrapper").appendChild(tracker);
	}, 20);
	
}
