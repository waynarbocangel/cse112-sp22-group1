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

	@media only screen and (max-width:600px) {

		.nav-bar {
			display:none;
		}

		  
		  
		
		.navigation {
			display: block;
			background-color: rgba(236, 223, 207, 0.4);
			height: 8vh;
			padding: none;
			margin: none;
			width: 100%;
			top: 0;
			left: 0;
			position:fixed;
		}
		  
		  
		#menuToggle {
			display: flex;
			flex-direction: column;
			position: absolute;
			top: 3vh;
			left: 4vw;
			z-index: 1;
		  }
		  
		#menuToggle input {
			display: flex;
			width: 40px;
			height: 32px;
			position: absolute;
			cursor: pointer;
			opacity: 0;
			z-index: 2;
		  }
		  
		#menuToggle span {
			display: flex;
			width: 29px;
			height: 2px;
			margin-bottom: 5px;
			position: relative;
			background: grey;
			border-radius: 3px;
			z-index: 1;
			transform-origin: 5px 0px;
			transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
						background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
						opacity 0.55s ease;
		}
		  
		#menuToggle span:first-child {
			transform-origin: 0% 0%;
		}
		  
		#menuToggle span:nth-last-child(2) {
			transform-origin: 0% 100%;
		}
		  
		#menuToggle input:checked ~ span {
			opacity: 1;
			transform: rotate(45deg) translate(-3px, -1px);
			background: #36383F;
		}
		
		#menuToggle input:checked ~ span:nth-last-child(3) {
			opacity: 0;
			transform: rotate(0deg) scale(0.2, 0.2);
		}
		
		#menuToggle input:checked ~ span:nth-last-child(2) {
			transform: rotate(-45deg) translate(0, -1px);
		}
		  
		#menu {
			position: absolute;
			width: 180px;
			height: 400px;
			box-shadow: 0 0 10px #85888C;
			margin: -50px 0 0 -50px;
			padding: 50px;
			padding-top: 125px;
			background-color: #F5F6FA;
			-webkit-font-smoothing: antialiased;
			transform-origin: 0% 0%;
			transform: translate(-100%, 0);
			transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
		}

		#menu {
			position: fixed;
			height: 100%;
			width: 40%;
		}

		#menu li {
			position: absolute;
			transition-delay: 2s;
			left: 30%;
			top: 10%;
		}

		#home {
			position: absolute;
			width: 40px;
			height: 40px;
			top: 3vh;
		}

		#target {
			position: absolute;
			width: 40px;
			height: 40px;
			top: 15vh;
		}

		#single {
			position: absolute;
			width: 40px;
			height: 40px;
			top: 27vh;
		}

		#double {
			position: absolute;
			width: 40px;
			height: 40px;
			top: 39vh;
		}

		#user {
			position: absolute;
			width: 45px;
			height: 45px;
			top:80vh;
		}

		  
		  #menuToggle input:checked ~ ul
		  {
			transform: none;
		  }
 
	}
	</style> 
	</head>

	<body>
		<nav class="nav-bar">
		<ul>
			<li><button id="home"> </button></li>
			<li><button id="target">  </button></li>
			<li><button id="single">  </button></li>
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
		<ul id="menu">
			<li><button id="home"></button>  </li>
			<li><button id="target">  </button></li>
			<li><button id="single">  </button></li>
			<li><button id="double">  </button></li>
			<li><button id="user">  </button></li>
		</ul>
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