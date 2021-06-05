const template = document.createElement("template");

template.innerHTML = `
	<html> 
	<head>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&family=Satisfy&family=Source+Sans+Pro:wght@300&family=Tajawal:wght@300&display=swap" rel="stylesheet">

	<style>
        #dropbtn {
            background-image: url(plus.png);
            background-size: cover;
            background-color: transparent;
            background-blend-mode: multiply;
            border:none;
            
        
            width: 40px;
            height: 40px;
            padding: 20px;
            border: none;
            cursor: pointer;
        }
        
        .dropdown-content {
            display: none;
            position: absolute;
            background-color: rgba(236, 223, 207, 0.4);
            min-width: 160px;
            overflow: auto;
            z-index: 1;
        }
        

        .dropdown-content ul {
            padding: 12px 16px;
            list-style-type: none;
        }

        #myDropdown button {
            background-color: transparent; /* Green */
            border: none;
            color: balck;
            padding: 20px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 30px;
            font-family: 'Satisfy', cursive;
            cursor: pointer;
        }
        
        .show {display: block;}


	</style> 
	</head>

	<body>

        <div class="dropdown">
            <button id="dropbtn"> </button>
            <div id="myDropdown" class="dropdown-content">
                <ul>
                    <li><button id="future"> Future </button></li>
                    <li><button id="monthly"> Monthly </button></li>
                    <li><button id="daily"> Daily </button></li>
                </ul>
            </div>
        </div>
	</body>
	</html> 
	
`;


export class plusbar extends HTMLElement {
	constructor () {
		super();
		this.attachShadow({mode: "open"});
		this.shadowRoot.appendChild(template.content.cloneNode(true));


		this.home = this.shadowRoot.querySelectorAll("button")[0];
		this.target = this.shadowRoot.querySelectorAll("button")[1];
		this.single = this.shadowRoot.querySelectorAll("button")[2];
		this.double = this.shadowRoot.querySelectorAll("button")[3];


		this.home.addEventListener("click", () => {
			this.shadowRoot.getElementById("myDropdown").classList.toggle("show");
		});

		this.target.addEventListener("click", () => {
			alert("hello");
		});
		this.single.addEventListener("click", () => {
			alert("hello");
		});
		this.double.addEventListener("click", () => {
			alert("hello");
		});

	}
}

customElements.define("plus-bar", plusbar);
