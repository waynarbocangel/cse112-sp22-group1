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

let currentObject;
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
		console.log(user);
		if (err) {
			window.location.href = "http://localhost:8080/login";
		} else {
			if (id != null){
				let userArr = [];
				Array.prototype.push.apply(userArr, user.dailyLogs);
				Array.prototype.push.apply(userArr, user.monthlyLogs);
				Array.prototype.push.apply(urseArr, user.futureLogs);
				Array.prototype.push.apply(userArr, user.collections);
				let parsed = userArr.filter(object => object.id = id);
				currentObject = parsed[0];
			} else {
				currentObject = user.index;
			}
			console.log(currentObject);
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

			let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", 
				"October", "November", "December"];

			for(let i = 0; i < parentArr.length; i++) {

				if (parentArr[i].objectType == "futureLog") {
					console.log();
					let dropdown = new DropdownBlock(`Future Log: ${new Date(parentArr[i].startDate).getFullYear()}`, parentArr[i], 1);
					contentWrapper.appendChild(dropdown);

					for (let j = 0; j < parentArr[i].months.length; j++) {
						console.log(parentArr[i].months[j]);
						let currentMonth = user.monthlyLogs.filter(month => month.id == parentArr[i].months[j])[0];
						let dropdownMonth = new DropdownBlock(`Monthly Log: ${monthNames[new Date(currentMonth.date).getMonth()]}`, currentMonth, 2);
						dropdown.contentWrapper.appendChild(dropdownMonth);
						console.log(currentMonth);
						for(let k = 0; k < currentMonth.days.length; k++) {
							let currentDay = user.dailyLogs.filter(day => day.id == currentMonth.days[k]);
							let dropdownDay = new DropdownBlock(`Daily Log: ${monthNames[new Date(currentMonth.date).getMonth()]} ${new Date(currentDay.date).getUTCDate()}`, currentDay, 3);
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
	
	let dropdown = new DropdownBlock();
	contentWrapper.appendChild(dropdown);

	dropdown.contentWrapper.appendChild(new DropdownBlock());

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

export function setupFutureLog(header, btn){
	localStorage.readUser((err, user) => {
		if (err) {
			console.log(err);
		} else {
			let userArr = user.monthlyLogs;

			let parentArr = [];
			for (let i = 0; i < currentObject.months.length; i++) {
				Array.prototype.push.apply(parentArr, userArr.filter(object => object.id == currentObject.months[i]));
			}

			let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", 
				"October", "November", "December"];

			for(let i = 0; i < parentArr.length; i++) {
				let currentMonth = parentArr[i];
				let dropdownMonth = new DropdownBlock(`Monthly Log: ${monthNames[currentMonth.date.getMonth()]}`, currentMonth, 1);
				contentWrapper.appendChild(dropdownMonth);

				for(let k = 0; k < currentMonth.days.length; k++) {
					let currentDay = user.dailyLogs.filter(day => day.id == currentMonth.days[k]);
					let dropdownDay = new DropdownBlock(`Daily Log: ${monthNames[currentDay.date.getMonth()]} ${currentDay.date.getUTCDate()}`, currentDay, 2);
					dropdownMonth.contentWrapper.appendChild(dropdownDay);
				}
			}
		}
	});

	header.title = "Future Log";
	pageNumber = 4;
	url = "#future_log";
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
	document.getElementById("trackerWrapper").appendChild(new TrackerMenu());
}

export function setupMonthlyLog(header, btn){
	localStorage.readUser((err, user) => {
		if (err) {
			console.log(err);
		} else {
			let userArr = user.dailyLogs;

			let parentArr = [];
			for (let i = 0; i < currentObject.days.length; i++) {
				Array.prototype.push.apply(parentArr, userArr.filter(object => object.id == currentObject.days[i]));
			}

			let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", 
				"October", "November", "December"];

			for(let i = 0; i < parentArr.length; i++) {
				let currentDay = parentArr[i];
				let dropdownDay = new DropdownBlock(`Daily Log: ${monthNames[currentDay.date.getMonth()]} ${currentDay.date.getUTCDate()}`, currentDay, 1);
				contentWrapper.appendChild(dropdownDay);
			}
		}
	});

	header.title = "Monthly Log";
	pageNumber = 3;
	url = "#monthly_log";
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
	document.getElementById("trackerWrapper").appendChild(new TrackerMenu());
}

export function setupDailyLog(header, btn){
	header.title = "Daily Log";
	pageNumber = 2;
	url = state;
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
	let tracker = new TrackerMenu()
	setTimeout(() => {
		let trackerContent = tracker.shadowRoot.getElementById('editor');
		createEditor(trackerContent, (success) => {
			console.log(success);
		});
		document.getElementById("trackerWrapper").appendChild(tracker);
	}, 20);
	
}
