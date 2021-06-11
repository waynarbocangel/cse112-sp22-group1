import * as localStorage from "../localStorage/userOperations.js";
import { currentObject } from "../index.js";

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
	<form action='/api/audio' method="post" enctype="multipart/form-data">
  		<input type='file' name="audio" />
	</form>
`;
export class AudioBlock extends HTMLElement {
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
			let file = null;
			fileReader.onload = (e) => {
				file = e.target.result
				console.log("this is filereader", e);
				this.buffer = e.target.result;
				
				localStorage.createAudioBlock(currentObject.id, "full", this.buffer, true, (err, audioBlock) => {
					if (err) {
						console.log(err);
					} else {
						console.log(audioBlock);
						/*var urlCreator = window.URL || window.webkitURL;
						let blob = new Blob([audioBlock.data]);
						let audioUrl = urlCreator.createObjectURL( blob );*/
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
