/* eslint-disable */
import * as localStorage from "../localStorage/userOperations.js";
import { currentObject } from "../index.js";

// JSX Engine Import
/* eslint-disable */
/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from "../jsxEngine.js";
/* eslint-enable */

let template = <template>
	<link type="text/css" rel="stylesheet" href="imageBlock.css" />
	<div id="editorIcons" class="paragraphIcons"><img src="../public/resources/plusIcon.png" class="unfocusedIcons" id="plus" /><img src="../public/resources/sixDotIcon.png" class="unfocusedIcons" id="more" /></div>
	<input type='file' name='image' />
	<img id="output" src="" alt="" />
</template>;

export class ImageBlock extends HTMLElement {
	constructor () {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.plus = this.shadowRoot.getElementById("plus");
		this.more = this.shadowRoot.getElementById("more");
		this.buffer = null
	}

	connectedCallback () {

		this.plus.onclick = () => {
			let offsetValue = textBlock.getBoundingClientRect().top + textBlock.offsetHeight + 105 > window.innerHeight ? - 100 : textBlock.offsetHeight + 5;

		};

		this.plus.onclick = () => {
			let imageInput = this.shadowRoot.querySelector("form > input[type=file]").files[0];

			console.log("this is an image file", imageInput);
			let fileReader = new FileReader();
			let file = null;
			fileReader.onload = (e) => {
				file = e.target.result
				console.log("this is filereader", e);
				this.buffer = e.target.result;

				localStorage.createImageBlock(currentObject.id, "full", this.buffer, true, (err, imageBlock) => {
					if (err) {
						console.log(err);
					} else {
						console.log(imageBlock);
						this.shadowRoot.querySelector("#output").src = imageBlock.data;
					}
				});
			}
			fileReader.readAsDataURL(imageInput);
		}
	}
}

window.customElements.define("image-block", ImageBlock);
