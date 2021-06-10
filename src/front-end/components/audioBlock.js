

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
	<audio controls id="audioBlock">
		<source />
		Your browser does not support audio
	</audio>
`;
/*
export class AudioBlock extends HTMLElement {
	constructor (controller, itemObject, signifier, callback) {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.plus = this.shadowRoot.getElementById("plus");
		this.more = this.shadowRoot.getElementById("more");
		this.buffer = null
	}

	connectedCallback () {
		let audioBlock = this.shadowRoot.getElementById("audioBlock");
		textBlock.focus();

		document.addEventListener(shadow.eventName, () => {
			this.controller.blockArray[this.controller.currentBlockIndex].setCurrentSpot();
		});

		this.plus.onclick = () => {
			let audioInput = document.getElementById("audioBlock");
		    let audio = audioInput.files[0];
			let fileBuffer = Buffer.from(audio);
			this.buffer = fileBuffer;
			
			localStorage.createAudioBlock(currentObject.id, this.buffer, (err, imageBlock) => {

			});
		}
	}
}
*/
