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

export function setupIndex(title, btn){
	title.innerText = "Index";
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

export function setupDailyLog(title, btn){
	title.innerText = "daily_log";
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

export function setupMonthlyLog(title, btn){
	title.innerText = "monthly_log";
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

export function setupFutureLog(title, btn){
	title.innerText = "future_log";
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

