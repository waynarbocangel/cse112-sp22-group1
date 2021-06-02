import { router } from "../router.js";
import { currentObject, header } from "../index.js";
import * as localStorage from "../localStorage/userOperations.js";
const template = document.createElement('template');

template.innerHTML = `
	<style>
		.navigation {
			display: none; 
		}

		.nav-bar {
			position: fixed;
			width: 60px;
			height: 100%;
			top: 0;
			bottom: 0;
			left: 0;
			display: block;
			background-color: var(--navbar-background-color);
		}

		button {
			display: block;
			background-color: transparent;
			border: none;
			padding: 0;
			width: 32px;
			height: 32px;
			margin: 20px auto 44px auto;
			cursor: pointer;
		}

		button img {
			height: 100%;
			filter: var(--icon-filter);
			opacity: 50%;
		}

		button:hover img {
			opacity: 100%;
			transition: opacity 25ms;
		}

		#bottom {
			position: absolute;
			bottom: 10px;
			width: 100%;
		}

		#user {
			position: static;
			margin: 0 auto;
		}

		@media only screen and (max-width:900px) {
			#menu {
				position: fixed;
				width: 30%;
				height: 100%;
				box-shadow: 0 0 2px #85888C;
				top: 0;
				left: 0;
				margin: 0;
				padding: 0;
				background-color: var(--navbar-background-color);
				-webkit-font-smoothing: antialiased;
			}

			#menu.closed {
				transform: translate(-100%, 0);
				transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
			}

			#menu.open {
				transform-origin: 0 0;
				transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
			}

			.nav-bar {
				display:none;
			}

			.navigation {
				display: block;
				padding: none;
				margin: none;
				width: 30vh;
				top: 0;
				left: 0;
				position:fixed;
			}

			#homeMenu {
				position: absolute;
				width: 60px;
				height: 60px;
				top: 70px;
				left: 0;
				right: 0;
				margin: auto;
			}

			#singleMenu {
				position: absolute;
				width: 60px;
				height: 60px;
				top: 180px;
				left: 0;
				right: 0;
				margin: auto;
			}

			#doubleMenu {
				position: absolute;
				width: 60px;
				height: 60px;
				top: 290px;
				left: 0;
				right: 0;
				margin: auto;
			}

			#userMenu {
				position: absolute;
				width: 65px;
				height: 65px;
				top: calc(100% - 115px);
				left: 0;
				right: 0;
				padding: 0;
				margin: 0 auto;
			}
		}

		@media only screen and (max-height: 1200px){
			#homeMenu {
				width: 40px;
				height: 40px;
			}

			#singleMenu {
				width: 40px;
				height: 40px;
				top: 150px;
			}

			#doubleMenu {
				width: 40px;
				height: 40px;
				top: 230px;
			}

			#userMenu {
				position: absolute;
				width: 45px;
				height: 45px;
				top: calc(100% - 85px);
			}
		}

		@media only screen and (max-height: 800px){
			#homeMenu {
				width: 35px;
				height: 35px;
			}

			#singleMenu {
				width: 35px;
				height: 35px;
				top: 130px;
			}

			#doubleMenu {
				width: 35px;
				height: 35px;
				top: 190px;
			}

			#userMenu {
				position: absolute;
				width: 40px;
				height: 40px;
				top: calc(100% - 65px);
			}
		}
	</style> 

	<nav class="nav-bar">
		<button id="home">  <img src="../public/resources/home_icon.png"></button>
		<button id="target"><img src="../public/resources/target_icon.png"></button>
		<button id="single"><img src="../public/resources/left.png"></button>
		<button id="double"><img src="../public/resources/double_icon.png"></button>
		<div id="bottom">
			<button id="user">  <img src="../public/resources/user.png"></button>
		</div>
	</nav>
	<nav class="navigation">
		<div id="menu" class="closed">
			<button id="homeMenu">  <img src="../public/resources/home_icon.png"></button>
			<button id="singleMenu"><img src="../public/resources/left.png"></button>
			<button id="doubleMenu"><img src="../public/resources/double_icon.png"></button>
			<button id="userMenu">  <img src="../public/resources/user.png"></button>
		</div>
	</nav>
`;

export class NavBar extends HTMLElement {
	static get observedAttributes() {
		return ['open'];
	}

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(template.content.cloneNode(true));

		this.home = this.shadowRoot.querySelectorAll('button')[0];
		this.target = this.shadowRoot.querySelectorAll('button')[1];
		this.single = this.shadowRoot.querySelectorAll('button')[2];
		this.double = this.shadowRoot.querySelectorAll('button')[3];
		this.user = this.shadowRoot.querySelectorAll('button')[4];

		this.menu = this.shadowRoot.querySelector('#menu');
		this.homeMenu = this.shadowRoot.querySelector('#homeMenu');
		this.singleMenu = this.shadowRoot.querySelector('#singleMenu');
		this.doubleMenu = this.shadowRoot.querySelector('#doubleMenu');
		this.userMenu = this.shadowRoot.querySelector('#userMenu');
	}

	connectedCallback() {
		this.home.addEventListener('click', () => {
			this.goHome();
		});
		this.target.addEventListener('click', () => {
			this.toggleTracker();
		});
		this.single.addEventListener('click', () => {
			this.goBack();
		});
		this.double.addEventListener('click', () => {
			this.goFarBack();
		});
		this.user.addEventListener('click', () => {
			let settingsMenu = document.querySelector("settings-menu");

			settingsMenu.toggle();
		});

		this.homeMenu.addEventListener('click', () => {
			this.goHome();
			this.open = false;
		});
		this.singleMenu.addEventListener('click', () => {
			this.goBack();
			this.open = false;
		});
		this.doubleMenu.addEventListener('click', () => {
			this.goFarBack();
			this.open = false;
		});
		this.userMenu.addEventListener('click', () => {
			let settingsMenu = document.querySelector("settings-menu");
			settingsMenu.toggle();
		});
	}

	attributeChangedCallback(attr, oldVal, newVal) {
		if (oldVal != newVal) {
			this[attr] = newVal;
		}
	}

	goHome() {
		if (document.location.hash != null && document.location.hash != "#index" && document.location.hash != '') {
			router.setState("", false);
		}
	}

	goBack() {
		let parent = (document.location.hash.includes("#dailyLog")) ? "monthlyLog" : "futureLog";
		router.setState(`#${parent}~${currentObject.parent}`, false);
	}

	goFarBack() {
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
	}

	toggleTracker() {
		const trackerMenu = document.querySelector("tracker-menu");
		trackerMenu.toggle();
	}

	toggle() {
		this.open = !this.open;
	}

	get open() {
		return this.hasAttribute('open');
	}

	set open(isOpen) {
		this.menu.classList.toggle('open', isOpen);
		this.menu.classList.toggle('closed', !isOpen);
		this.menu.setAttribute('aria-hidden', !isOpen)
		if (isOpen) {
			this.setAttribute('open', 'true');
			this.focus();
			header.menuToggle.checked = true;
		} else {
			this.removeAttribute('open');
			header.menuToggle.checked = false;
		}
	}
}

customElements.define('nav-bar', NavBar);