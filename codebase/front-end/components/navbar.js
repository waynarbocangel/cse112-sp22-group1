import {router} from "../router.js";
import {currentObject} from "../index.js";
import * as localStorage from "../localStorage/userOperations.js";
const template = document.createElement('template');

template.innerHTML = `
	<style>
		.nav-bar {
			position: absolute;
			width: 60px;
			height: 100%;
			top: 0;
			bottom: 0;
			left: 0;

			background: rgba(236, 223, 207, 0.4);
			

		}

		#home {
			background-image: url(../public/resources/home_icon.png);
			background-size: cover;
			background-color: transparent;
			border:none;

			position: absolute;
			width: 32px;
			height: 32px;
			left: 15px;
			top: 20px;
		}

		#target {
			background-image: url(../public/resources/target_icon.png);
			background-size: cover;
			background-color: transparent;
			background-blend-mode: multiply;
			border:none;

			position: absolute;
			width: 35px;
			height: 35px;
			left: 15px;
			top: 90px;
		}

		#single {
			background-image: url(../public/resources/left.png);
			background-size: cover;
			background-color: transparent;
			background-blend-mode: multiply;
			border:none;

			position: absolute;
			width: 32px;
			height: 32px;
			left: 15px;
			top: 160px;
		}

		#double {
			background-image: url(../public/resources/double_icon.png);
			background-size: cover;
			background-color: transparent;
			background-blend-mode: multiply;
			border:none;

			position: absolute;
			width: 35px;
			height: 35px;
			left: 15px;
			top: 230px;
		}

		#user {
			background-image: url(../public/resources/user.png);
			background-size: cover;
			background-color: transparent;
			background-blend-mode: multiply;
			border:none;

			position: absolute;
			width: 33px;
			height: 33px;
			left: 13.5px;
			bottom: 20px;
		}

		ul {
			list-style-type: none;
		}

		ul li {
			opacity: 0.7;
			transition: 150ms;
		}

		ul li:hover{
			opacity: 1;
			transition: 150ms;
		}

		ul li button{
			cursor: pointer;
		}

	</style> 

	<nav class="nav-bar">
		<ul>
			<li><button id="home"></button></li>
			<li><button id="target"></button></li>
			<li><button id="single"></button></li>
			<li><button id="double"></button></li>
			<li><button id="user"></button></li>
		</ul>
	</nav>
`;

export class NavBar extends HTMLElement {
	constructor () {
		super ();
		this.attachShadow({mode: 'open'});
		this.shadowRoot.appendChild(template.content.cloneNode(true));


		this.home = this.shadowRoot.querySelectorAll('button')[0];
		this.target = this.shadowRoot.querySelectorAll('button')[1];
		this.single = this.shadowRoot.querySelectorAll('button')[2];
		this.double = this.shadowRoot.querySelectorAll('button')[3];
		this.user = this.shadowRoot.querySelectorAll('button')[4];


		this.home.addEventListener('click', () => {
			if (document.location.hash != null && document.location.hash != "#index" && document.location.hash !=''){
				router.setState("", false);
			}
		});

		this.target.addEventListener('click', () => {
			const trackerMenu = document.querySelector("tracker-menu");
			trackerMenu.toggle();
		});
		this.single.addEventListener('click', () => {
			let parent = (document.location.hash.includes("#dailyLog")) ? "monthlyLog" : "futureLog";
			router.setState(`#${parent}~${currentObject.parent}`, false);
		});
		this.double.addEventListener('click', () => {
			let parent = (document.location.hash.includes("#dailyLog")) ? "futureLog" : "index";
			localStorage.readUser((err, user) => {
				if (err == null) {
					let userArr = [];
					Array.prototype.push.apply(userArr, user.dailyLogs);
					Array.prototype.push.apply(userArr, user.monthlyLogs);
					Array.prototype.push.apply(userArr, user.futureLogs);
					Array.prototype.push.apply(userArr, user.collections);
					let parsed = userArr.filter(object => object.id == currentObject.parent);
					let firstParent = parsed[0];
					router.setState(`#${parent}~${firstParent.parent}`, false);
				} else {
					console.log(err);
				}
			});
			
		});
		this.user.addEventListener('click', () => {
			alert("hello"); 
		});
	}
}

customElements.define('nav-bar', NavBar);