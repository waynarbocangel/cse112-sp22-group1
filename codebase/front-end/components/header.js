import * as localStorage from "../localStorage/userOperations.js";
import { navbar } from "../index.js";

export class PageHeader extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });

		this.shadowRoot.innerHTML = `
			<style>
				@font-face {
					font-family:"SF-Pro";
					src: url("./public/fonts/SF-Pro.ttf");
				}

				:host {
					display: block;
					margin-left: 80px;
					margin-right: 20px;
					text-align: left;
				}
		
				/* Top navigation */
				#container {
					display: flex;
					align-items: center;
					height: 75px;
					border-bottom: solid 2px var(--border-color);
				}

				.header {
					font-family: "SF-Pro";
					position: relative;
					flex: 2;	/* Use half of the space for the title */
				}
		
				button {
					user-select: none;
					vertical-align: middle;
					border: none;
					background-color: rgba(0,0,0,0);
					display: inline;
				}

				button.plus {
					display: inline-block;
					width: 23px;
					height: 23px;
					margin-right: 0;
				}
				
				.imgbutton {
					height: 20px;
				}
		
				.imgbutton img {
					opacity: 20%;
					filter: var(--icon-filter);
					height: 100%;
					cursor: pointer;
				}
		
				.imgbutton:hover img {
					opacity: 100%;
					transition: opacity 150ms;
				}
		
				h1 {
					display: inline;
					font-size: 40px;
					font-weight: bold;
					letter-spacing: 1.8px;
					vertical-align: middle;
					z-index: 0;
					outline: none;
				}
		
				.search_bar {
					display: flex;
					align-items: center;
					margin: 15px auto 15px 10px;
					padding: 0 5px;
					border-radius: 5px;
					border-color: var(--border-color); /*rgba(0, 0, 0, 0.1);*/
					border-width: 2px;
					border-style: solid;
					opacity: 60%;
				}
		
				.search_bar img {
					display: inline-block;
				
					opacity: 50%;
					height: 21px;
		
					vertical-align: middle;

					filter: var(--icon-filter);
				}

				.search_bar input{

					background-color: rgba(0, 0, 0, 0);
					color: var(--content-foreground-color);
					font-size: 14pt;
					opacity: 90%;
					height: 35px;
					text-align: left;
					width: 400px;
					border: solid;
					border-radius: 5px;
					border-color: rgba(0, 0, 0, 0);
					outline: none;
				}
		
				/* Fade in for search bar */
				.search_bar:hover img {
					opacity: 50%;
					transition: opacity 150ms;
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
					margin-right: 5px;
				}
		
				#header_forward{
					margin-right: 0;
					margin-left: 5px;
				}
		
				.hide{
					display: none;
					opacity: 0;
				}

				#menuToggle {
					display: none;
				}

				@media screen and (max-width: 1250px) {
					.search_bar input {
						width: 220px;
					}
				}

				@media screen and (max-width: 1080px) {
					.search_bar input {
						width: 170px;
					}
				}

				@media screen and (max-width: 1020px) {
					.search_bar {
						display: none;
					}
				}

				@media screen and (max-width: 900px) {
					
					:host {
						margin-left: 20px;
						padding-top: 10px;
					}

					.search_bar {
						display: none;
					}

					.header{
						margin-left: 35px;
						margin-right: 35px;
						text-align: center;
						flex: 2;
					}

					.plus {
						width: 23px;
						height: 23px;
						padding-top: 5px;
						right: 20px;
					}

					#title_page{
						top: 5px;
						font-size: 35px;
						letter-spacing: 1.5px;
					}

					button.imgbutton {
						padding: 0;
					}
					#header_back{
						margin-left: 0;
						margin-right: 1px;
					}
			
					#header_forward{
						margin-right: 0;
						margin-left: 1px;
					}
					
					#container{
						height: 70px;
						align-items: center;
					}

					#menuToggle {
						display: inline-block;
						flex-direction: column;
						left: 20px;
						padding-top: 5px;
						z-index: 1;
					}
		
					#menuToggle input {
						display: flex;
						width: 40px;
						height: 32px;
						left: 10px;
						top: 15px;
						position: absolute;
						cursor: pointer;
						opacity: 0;
						z-index: 2;
					}
		
					#menuToggle span {
						display: flex;
						width: 29px;
						height: 2px;
						margin-top: 5px;
						margin-bottom: 5px;
						position: relative;
						border-radius: 3px;
						background: var(--content-foreground-color);
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
						transform: rotate(45deg) translate(-7px, -10px);
					}
		
					#menuToggle input:checked ~ span:nth-last-child(3) {
						opacity: 0;
						transform: rotate(0deg) scale(0.2, 0.2);
					}
		
					#menuToggle input:checked ~ span:nth-last-child(2) {
						transform: rotate(-45deg) translate(-5px, 10px);
					}
				}

				@media screen and (max-width: 700px) {
					.plus{

					}

					#container{
						height: 50px;
					}

					#title_page{
						top: 5px;
						font-size: 22px;
						letter-spacing: 1px;
					}

					#menuToggle input {
						top: 8px;
					}

					button.imgbutton img {
					}

					button.imgbutton {
						padding: 0;
					}

					#header_back {
						margin-left: 0;
						margin-right: 1px;
					}
			
					#header_forward{
						margin-right: 0;
						margin-left: 1px;
					}
				}
			</style>

			<div id="container">
				<div id="menuToggle">
					<input type="checkbox" />
					<span></span>
					<span></span>
					<span></span>
				</div>
				<span class="header">
					<button class="imgbutton" id="header_back"><img src="../public/resources/left-chevron.png"></button>
			
					<h1 id="title_page">Template Page Title</h1>
			
					<button class="imgbutton" id="header_forward"><img src="../public/resources/right-chevron.png"></button>
				</span>
			
				<button class="imgbutton plus"><img src="../public/resources/plusIcon.png"></button>
			
				<span class="search_bar">
					<input type="text" placeholder="Search">
					<img src="../public/resources/search_icon.png">
				</span>
			</div>
		`;

		this.h1 = this.shadowRoot.getElementById("title_page");

		this.createFutureLog = this.createFutureLog.bind(this);
		this.futureLogButton = this.shadowRoot.querySelector(".plus");
		this.futureLogButton.addEventListener("click", () => {
			this.createFutureLog();
		});

		this.imgbuttons = this.shadowRoot.querySelectorAll(".imgbutton");
		this.menuToggle = this.shadowRoot.querySelector("#menuToggle input");
	}

	connectedCallback() {
		this.menuToggle.addEventListener("change", () => {
			navbar.toggle();
		});
	}

	makeEditabe() {
		this.h1.contentEditable = true;
	}

	makeUneditable() {
		this.h1.contentEditable = false;
	}

	set title(title) {
		console.log("this");
		this.shadowRoot.getElementById("title_page").innerHTML = title;
		console.log(this.h1);
	}

	get title() {
		return this.h1.innerText;
	}

	createFutureLog() {
		localStorage.createFutureLog(new Date(2021, 5, 22), new Date(2021, 8, 23), [], [], [], (err, futureLog) => {
			console.log(futureLog);
			localStorage.readUser((err, res) => {
				if (err) {
					console.log(err);
				} else {
					console.log(res);
					// localStorage.createCollection("testing createCollection", "1", [], (err, collection) => {
					// 	console.log(collection);
					// 	localStorage.readUser((err, res) => {
					// 		if(err) {
					// 			console.log(err);
					// 		} else {
					// 			console.log(res);
					// 		}
					// 	});
					// });
				}
			})
		});

	}
}

window.customElements.define('page-header', PageHeader);
