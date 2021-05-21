import * as localStorage from "./localStorage/userOperations.js";
import {NavBar} from "./components/navbar.js";
import {PageHeader} from "./components/header.js";
import {TrackerMenu} from "./components/tracker.js";
import { TextBlock } from "./components/block.js";
import { Controller } from "./components/blockController.js";
import {blockArray} from "./index.js";

let contentWrapper = document.getElementById("contentWrapper");

export const router = {};

let controller = new Controller();
let navbar = new NavBar();
let header = new PageHeader();

router.setState = function(state, prev) {
	setTimeout(() => {
		let url = "";
		if (document.getElementById("trackerWrapper").childNodes.length > 0) {
			document.getElementById("trackerWrapper").removeChild(document.getElementById("trackerWrapper").childNodes[0]);
		}
		let body = document.querySelector("body");
		body.className = "";
		let content = document.querySelector("body");
		let topbar = document.getElementById("topbar");
		let pageNumber = 1;
		
		document.getElementById("sidebar").appendChild(navbar);
		let btn = navbar.shadowRoot.querySelectorAll("button");
		
		fade(content, () => {
			localStorage.readUser((user) => {
				let newBlock = new TextBlock(controller, (success) => {
					if (success){
						contentWrapper.appendChild(newBlock);
						blockArray.push(newBlock);
						controller.currentBlockIndex = blockArray.length - 1;
						newBlock.focus();
					}
				});
				topbar.appendChild(header);
				let title = header.shadowRoot.getElementById("title_page");
				// console.log(user);
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
				else if(state.includes("#daily_log")) {
					title.innerText = "daily_log";
					pageNumber = 2;
					url = state;
					//setting navbar buttons                  
					for(let i = 0; i<btn.length;i++)
					{
						btn[i].removeAttribute("disabled");
						btn[i].style.visibility = "visible";
					}
					document.getElementById("trackerWrapper").appendChild(new TrackerMenu());
				}
				else if(state.includes("#monthly_log")) {
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
					document.getElementById("trackerWrapper").appendChild(new TrackerMenu());
				}
				else if(state.includes("#future_log")) {
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
					document.getElementById("trackerWrapper").appendChild(new TrackerMenu());
				}
				if (!prev){
					history.pushState({page: pageNumber}, title.innerText, url);
				}
				unfade(content, () => {});
			});
		});
	}, 25);
}

function fade(element, callback) {
    let op = 1;  // initial opacity
    let timer = setInterval(function () {
		let end = false;
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
			end = true;
        }
        element.style.opacity = op;
        op -= op * 0.1;
		if (end) {
			callback();
		}
    }, 10);
}


function unfade(element, callback) {
	let end = false;
    let op = 0.1;  // initial opacity
    element.style.display = 'block';
    let timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
			end = true;
        }
        element.style.opacity = op;
        op += op * 0.1;
		if (end){
			callback();
		}
    }, 10);
}

