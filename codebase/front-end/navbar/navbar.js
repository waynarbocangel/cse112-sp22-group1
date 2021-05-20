const template = document.createElement('template');

template.innerHTML = `
	<style>


		.nav-bar {
			position: absolute;
			width: 100px;
			height: 1080px;
			left: 0px;
			top: 0px;
			
			background: rgba(236, 223, 207, 0.4);

		}

		#home {
			background-image: url(home_icon.png);
			background-size: cover;
			background-color: transparent;
			border:none;

			position: absolute;
			width: 40px;
			height: 40px;
			left: 30px;
			top: 30px;
		}

		#target {
			background-image: url(target_icon.png);
			background-size: cover;
			background-color: transparent;
			background-blend-mode: multiply;
			border:none;

			position: absolute;
			width: 40px;
			height: 40px;
			left: 32px;
			top: 100px;
		}

		#single {
			background-image: url(left.png);
			background-size: cover;
			background-color: transparent;
			background-blend-mode: multiply;
			border:none;

			position: absolute;
			width: 40px;
			height: 40px;
			left: 26px;
			top: 170px;
		}

		#double {
			background-image: url(double_icon.png);
			background-size: cover;
			background-color: transparent;
			background-blend-mode: multiply;
			border:none;

			position: absolute;
			width: 40px;
			height: 40px;
			left: 28px;
			top: 240px;
		}

		#user {
			background-image: url(user.png);
			background-size: cover;
			background-color: transparent;
			background-blend-mode: multiply;
			border:none;

			position: absolute;
			width: 45px;
			height: 45px;
			left: 28px;
			top:90vh;
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
			alert("hello"); 
		});

		this.target.addEventListener('click', () => {
			alert("hello"); 
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