import * as localStorage from "../localStorage/userOperations.js";

export class PageHeader extends HTMLElement {
	constructor() {
		super();
		let template = document.createElement("template");
		template.innerHTML = `
			<style>
				@font-face {
					font-family:"SF-Pro";
					src: url("./public/fonts/SF-Pro.ttf");
				}
				@media screen and (max-width: 900px) {
					.search_bar {
						display: none;
					}
				
				}
				
				@media screen and (min-width: 600px) {
					.search_bar {
						float: right;
					}
				}
		
				/* Top navigation */
				.header {
					font-family: "SF-Pro";
					position: relative;
					top: 1em;
					margin-top: 100px;
					margin-left: 0;
				}
		
				button {
					vertical-align: bottom;
					border: none;
					background-color: rgba(0,0,0,0);
				}
		
				button.imgbutton{
					height: 20px;
				}
		
				button.imgbutton img {
					filter: opacity(50%);
					height: 20px;
				}
		
				button.imgbutton:hover img {
					filter: opacity(100%);
					transition: 150ms;
				}
		
				button {
					display: inline;
					margin-top: 0;
					margin-bottom: 0;
				}
		
				h1 {
					display: inline;
					font-size: 48px;
					font-weight: bold;
					letter-spacing: 1.8px;
					vertical-align: middle;
				}
		
				.search_bar {
					margin-top: 15px;
					margin-right: 0;
					height: 30px;
					border-radius: 5px;
					border-color: rgba(0, 0, 0, 0.1);
					border-width: 2px;
					border-style: solid;
					opacity: 60%;
				}
		
				.search_bar img {
					display: inline-block;
				
					opacity: 50%;
		
					height: 21px;
					line-height: 36px;
					vertical-align: text-bottom;
		
					/* TODO: unjank */
					position: relative;
					top: 0;
					right: 15px;
					margin-left: 10px;
				}
		
				.search_bar input{
					/* TODO: hard coded */
					margin-top: -6px;
					background-color: rgba(0, 0, 0, 0);
					font-size: 14pt;
					opacity: 90%;
					height: 35px;
					text-align: left;
					width: 400px;
					border: solid;
					border-radius: 5px;
					margin-left: 10px;
					border-color: rgba(0, 0, 0, 0);
					outline: none;
				}
		
				/* Fade in for search bar */
				.search_bar:hover img {
					opacity: 50%;
					transition: 150ms;
				}
		
				.search_bar:hover {
					transition: 150ms;
					opacity: 90%;
				}
		
				.search_bar input:focus .search_bar{
					transition: 150ms;
					opacity: 90%;
				}
		
				#header_back{
					margin-left: 0;
					margin-right: 10px;
				}
		
				#header_forward{
					margin-right: 0;
					margin-left: 10px;
				}
		
				.hide{
					display: none;
					opacity: 0;
				}

				.plus {
					position: relative;
					display: inline-block;
					float: right;

					background-image: url(../public/resources/target_icon.png);
					background-size: cover;
					background-color: transparent;
					background-blend-mode: multiply;
					top: 12px;
					width: 33px;
					height: 33px;
					opacity: 50%;
					transition: opacity .2s;
				}

				.plus:hover {
					opacity: 100%;
					transition: opacity .2s;
				}
			</style>

			

			<span class="header">
				<button class="imgbutton" id="header_back"><img src="../public/resources/left-chevron.png"></button>
		
				<h1 id="title_page">Template Page Title</h1>
		
				<button class="imgbutton" id="header_forward"><img src="../public/resources/right-chevron.png"></button>
			</span>

			
		
			<span class="search_bar">
				<input type="text" placeholder="Search">
				<img src="../public/resources/search_icon.png">
			</span>
			<button class="plus">
			</button>
		`;

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.h1 = this.shadowRoot.querySelector("h1");

		this.createFutureLog = this.createFutureLog.bind(this);
		this.futureLogButton = this.shadowRoot.querySelector(".plus");
		this.futureLogButton.addEventListener("click", () => {
			this.createFutureLog();
		});
	}

	set title(title) {
		this.h1.innerText = title;
	}

	get title() {
		return this.h1.innerText;
	}

	createFutureLog() {
		localStorage.createFutureLog( new Date(2021, 5, 22), new Date(2021, 8, 23), [], [], [], (err, futureLog) => {
			console.log(futureLog);
			localStorage.readUser( (err, res) => {
				if (err) {
					console.log(err);
				} else {
					console.log(res);
				}
			})
		});
		localStorage.createCollection("testing createCollection", "1", [], (err, collection) => {
			console.log(collection);
			localStorage.readUser((err, res) => {
				if(err) {
					console.log(err);
				} else {
					console.log(res);
				}
			});
		});
	}
}

customElements.define('page-header', PageHeader);
