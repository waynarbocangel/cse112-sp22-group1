const template = document.createElement('template');

template.innerHTML = `
	<html> 
	<head>

	<style>



	.navigation {
		display: none; 
	}
	.nav-bar {
		position: fixed;
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

	@media only screen and (max-width:1600px) {

		.nav-bar {
			display:none;
		}
		.navigation {
			display: block;
			background-color: rgba(236, 223, 207, 0.0);
			height: 8vh;
			padding: none;
			margin: none;
			width: 100%;
			top: 0;
			left: 0;
			position:fixed;
		}
		  
		#menu {
			position: fixed;
			width: 30%;
			height: 100%;
			box-shadow: 0 0 2px #85888C;
			top: 0;
			left: 0;
			margin: 0;
			padding: 0;
			background-color: white;
		}

		.menuClosed{
			-webkit-font-smoothing: antialiased;
			transform: translate(-100%, 0);
			transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
		}

		.menuOpen{
			-webkit-font-smoothing: antialiased;
			transform-origin: 0 0;
			transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
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

		#targetMenu {
			position: absolute;
			width: 60px;
			height: 60px;
			top: 180px;
			left: 0;
			right: 0;
			margin: auto;
		}

		#singleMenu {
			position: absolute;
			width: 60px;
			height: 60px;
			top: 290px;
			left: 0;
			right: 0;
			margin: auto;
		}

		#doubleMenu {
			position: absolute;
			width: 60px;
			height: 60px;
			top: 400px;
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

		  
		  #menuToggle input:checked ~ ul
		  {
			transform: none;
		  }
 
	}

	@media only screen and (max-height: 1200px){
		#homeMenu {
			width: 40px;
			height: 40px;
		}

		#targetMenu {
			width: 40px;
			height: 40px;
			top: 150px;
		}

		#singleMenu {
			width: 40px;
			height: 40px;
			top: 230px;
		}

		#doubleMenu {
			width: 40px;
			height: 40px;
			top: 310px;
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

		#targetMenu {
			width: 35px;
			height: 35px;
			top: 130px;
		}

		#singleMenu {
			width: 35px;
			height: 35px;
			top: 190px;
		}

		#doubleMenu {
			width: 35px;
			height: 35px;
			top: 250px;
		}

		#userMenu {
			position: absolute;
			width: 40px;
			height: 40px;
			top: calc(100% - 65px);
		}
	}

	</style> 
	</head>

	<body>
		<nav class="nav-bar">
		<ul>
			<li><button id="home"> </button></li>
			<li><button id="target"></button></li>
			<li><button id="single"></button></li>
			<li><button id="double"></button></li>
			<li><button id="user"></button></li>
		</ul>
	</nav>

	<nav class="navigation">
		<div id="menuToggle">
			<input type="checkbox" />
			<span></span>
			<span></span>
			<span></span>
		
		</div>
		<div id="menu" class="menuClosed">
			<button id="homeMenu"></button>
			<button id="targetMenu"></button>
			<button id="singleMenu"></button>
			<button id="doubleMenu"></button>
			<button id="userMenu"></button>
		</div>
	</nav>

	</body>
	</html> 
	
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
		this.menu = this.shadowRoot.querySelector('#menu');
		this.toggler = this.shadowRoot.querySelector('#menuToggle');
		this.homeMenu = this.shadowRoot.querySelector('#homeMenu');
		this.targetMenu = this.shadowRoot.querySelector('#targetMenu');
		this.singleMenu = this.shadowRoot.querySelector('#singleMenu');
		this.doubleMenu = this.shadowRoot.querySelector('#doubleMenu');
		this.userMenu = this.shadowRoot.querySelector('#userMenu');

	}

	connectedCallback () {
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

		this.homeMenu.addEventListener('click', () => {
			alert("hello"); 
		});
		this.targetMenu.addEventListener('click', () => {
			alert("hello"); 
		});
		this.singleMenu.addEventListener('click', () => {
			alert("hello"); 
		});
		this.doubleMenu.addEventListener('click', () => {
			alert("hello"); 
		});
		this.userMenu.addEventListener('click', () => {
			alert("hello"); 
		});
		
		this.toggler.addEventListener('click', () => {
			console.log("hello");
			if (this.menu.classList.contains("menuClosed")){
				this.menu.classList.remove("menuClosed");
				this.menu.classList.add("menuOpen");
			} else {
				this.menu.classList.remove("menuOpen");
				this.menu.classList.add("menuClosed");
			}
		});
	}
}

customElements.define('nav-bar', NavBar);