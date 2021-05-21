// import {readUserPouch} from "./localStorage/readFiles.readUser.js";
import * as localStorage from "./localStorage/userOperations.js";
import {NavBar} from "./components/navbar.js";
import {PageHeader} from "./components/header.js";

export const router = {};

let navbar = new NavBar();
let header = new PageHeader();
router.setState = function(state, prev) {
	setTimeout(() => {
		let url = "";
		console.log(state);
		let body = document.querySelector("body");
		body.className = "";
		document.getElementById("topbar").appendChild(header);
		let pageNumber = 1;
		let title = header.shadowRoot.getElementById("title_page");
		console.log(header);
		console.log(title);
		console.log(document.location);
		
		document.getElementById("sidebar").appendChild(navbar);
		let btn = navbar.shadowRoot.querySelectorAll("button");
		console.log(btn);
		//index page
		if(state == null || state == "#index" || state =='') {
			title.innerText = "Index";
			url = "/";	
			//setting navbar buttons      
			for(let i = 0; i<btn.length;i++)
			{
				btn[i].removeAttribute("disabled");
				btn[i].style.visibility = "visible";
			}
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
		else if(state == "#daily_log") {
			title.innerText = "daily_log";
			pageNumber = 2;
			url = "#daily_log";
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

		}
		else if(state == "#monthly_log") {
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
		}
		else if(state == "#future_log") {
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
		}

		history.pushState({page: pageNumber}, title.innerText, url);
	}, 100);
}

