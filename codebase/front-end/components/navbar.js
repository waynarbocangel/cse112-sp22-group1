import {router} from "../router.js";
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
			top: 30px;
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
			top: 100px;
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
			top: 170px;
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
			top: 240px;
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
			bottom: 25px;
		}

		ul {
			list-style-type: none;
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
			trackerMenu.title = "Daily Log Tracker";
		});
		this.single.addEventListener('click', () => {
			alert("hello"); 
		});
		this.double.addEventListener('click', () => {
			alert("hello"); 
		});
		this.user.addEventListener('click', () => {
			alert("hello"); 
		});
	}
}

customElements.define('nav-bar', NavBar);