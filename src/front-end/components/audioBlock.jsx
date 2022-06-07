/**
 * Audio Block
 * @module audioBlockModule
 */
import * as localStorage from "../localStorage/userOperations.js";
import { currentObject } from "../index.js";

// JSX Engine Import
/* eslint-disable */
/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from "../jsxEngine.js";
/* eslint-enable */

let template = <template>
	<link type="text/css" rel="stylesheet" href="audioBlock.css" />
	<div id="editorIcons" class="paragraphIcons"><img src="../public/resources/plusIcon.png" class="unfocusedIcons" id="plus" /><img src="../public/resources/sixDotIcon.png" class="unfocusedIcons" id="more" /></div>
	<form action='/api/audio' method="post" enctype="multipart/form-data">
  		<input type='file' name="audio" />
	</form>
</template>

/**
 * Class that creates an AudioBlock
 */
export class AudioBlock extends HTMLElement {
	/**
	 * AudioBlock constructor
	 */
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
			let audioInput = this.shadowRoot.querySelector("form > input[type=file]").files[0];

			console.log("this is an audio file", audioInput);
			let fileReader = new FileReader();
			fileReader.onload = (e) => {
				console.log("this is filereader", e);
				this.buffer = e.target.result;
				localStorage.createAudioBlock(currentObject.id, "full", this.buffer, true, (err, audioBlock) => {
					if (err) {
						console.log(err);
					} else {
						console.log(audioBlock);
						let audio = document.createElement("audio");
						let source = document.createElement("source");
						this.shadowRoot.appendChild(audio);
						audio.appendChild(source);
						source.setAttribute("src", audioBlock.data);
						source.setAttribute("type", "audio/mpeg");
						audio.setAttribute("controls", "controls");
					}
				});
			}
			fileReader.readAsDataURL(audioInput);
		}
	}
}

window.customElements.define("audio-block", AudioBlock);
