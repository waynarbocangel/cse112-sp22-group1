import {currentObject} from "../index.js";
import * as localStorage from "../localStorage/userOperations.js";
let template = document.createElement("template");
template.innerHTML = `
	<style>
		@font-face {
			font-family:"SF-Pro";
			src: url("./public/fonts/SF-Pro.ttf");
		}
		#textBlock {
			font-family: "SF-Pro";
			border: none;
			overflow: auto;
			outline: none;
			resize: none;
			display: inline-block;
		}

		#textBlock:empty::before{
			content: attr(placeholder);
			color: gray;
		}

		.unstylized{
			margin: 7px 0 12px;
			font-size: 18px;
			line-height: 28px;
			width: calc(100% - 44px);
		}

		#editorIcons{
			position: relative;
			display: inline;
			vertical-align: top;
		}
		
		#editorIcons img{
			margin-right: 7px;
			height: 15px;
			cursor: pointer;
			filter: var(--icon-filter);
		}

		.unfocusedIcons{
			opacity: 0.3;
			transition: 0.2s;
		}

		.focusedIcons{
			opacity: 0.5;
			transition: 0.2s;
		}

		#editorIcons img:hover{
			opacity: 0.8;
			transition: opacity 0.2s;
		}

		.paragraphIcons{
			top: 10px;
		}
	</style>
	<div id="editorIcons" class="paragraphIcons"><img src="../public/resources/plusIcon.png" class="unfocusedIcons"/><img src="../public/resources/sixDotIcon.png" class="unfocusedIcons"/></div>
	<div id="textBlock" contenteditable="true" ondrop="return false;" class="unstylized" placeholder='Type "/" to create an item: future log, collection, etc'></div>
`;

export class CreatorBlock extends HTMLElement{
	constructor(){
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
	}

	connectedCallback() {
		let textBlock = this.shadowRoot.getElementById("textBlock");
		textBlock.onkeydown = (e) => {
			let key = e.key;
			if (key == "Enter") {
				e.preventDefault();
				let content = textBlock.innerHTML;
				if (content == "/futurelog") {
					alert("New Future Log will be created");
				} else if (content == "/monthlylog") {
					alert("New Monthly Log will be created");
				} else if (content == "/dailylog") {
					alert("New Daily Log will be created");
				} else if (content == "/collection") {
					alert("New Collection will be created");
				} else if (content == "/tracker") {
					localStorage.createTracker("Practice Tracker", [], currentObject.id, true, (err, tracker) => {
						if (err) {
							console.log(err);
						} else {
							console.log(tracker);
						}
					});
				}
			}
		}
	}
}

window.customElements.define('creator-block', CreatorBlock);