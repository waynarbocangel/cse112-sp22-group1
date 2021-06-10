//import * as localStorage from "../localStorage/userOperations.js";
//import { currentObject } from "../index.js";
//const fs = require("fs");

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
			display: inline-block;
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
			margin-top: 10px;
		}
	</style>
	<div id="editorIcons" class="paragraphIcons"><img src="../public/resources/plusIcon.png" class="unfocusedIcons" id="plus" /><img src="../public/resources/sixDotIcon.png" class="unfocusedIcons" id="more" /></div>
	
	<form action='/api/images' method="post" enctype="multipart/form-data">
  		<input type='file' name='image' />
	</form>

	<image src="" alt="" />
`;

// export class ImageBlock extends HTMLElement {
// 	constructor () {
// 		super();
// 		this.attachShadow({ mode: "open" });
// 		this.shadowRoot.appendChild(template.content.cloneNode(true));
// 		this.plus = this.shadowRoot.getElementById("plus");
// 		this.more = this.shadowRoot.getElementById("more");
// 		this.buffer = null
// 	}

// 	connectedCallback () {
// 		// let imageBlock = this.shadowRoot.getElementById("imageBlock");
// 		// //imageBlock.focus();

// 		// this.plus.onclick = () => {
// 		// 	let imageInput = this.shadowRoot.querySelector("form > input[type=file]");
// 		// 	this.shadowRoot.querySelector("img").src = imageInput;
// 		// 	let image = imageInput.files[0];
// 		// 	let fileBuffer = fs.readFile(image);
// 		// 	this.buffer = fileBuffer;
			
// 		// 	localStorage.createImageBlock(null, null, this.buffer, (err, imageBlock) => {

// 		// 	});
// 		// }
// 	}
// }
// window.customElements.define("image-block", ImageBlock);
