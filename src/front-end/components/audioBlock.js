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
		// Might need to change component fetch
		fetch("./components/block.html").then((response) => response.text()).then((html) => {
			let parser = new DOMParser();
			let blockTemplateFile = parser.parseFromString(html, "text/html");
			let blockTemplate = blockTemplateFile.getElementById("block");
			this.attachShadow({ mode: "open" });
			this.shadowRoot.appendChild(blockTemplate.content.cloneNode(true));
			this.root = this.shadowRoot;
			this.item = itemObject;
			this.controller = controller;
			this.currentBlock = null;
			this.editorIcons = this.shadowRoot.getElementById("editorIcons");
			this.tabLevel = controller.currentTabLevel;
			this.atPressed = false;
			this.hashPressed = false;
			this.plus = this.shadowRoot.getElementById("plus");
			this.more = this.shadowRoot.getElementById("more");
			this.setupTabLevel();
			callback(true);
		})

	}
	setCurrentSpot () {
		let container = this.shadowRoot.getElementById("textBlock");
		let range = shadow.getRange(this.shadowRoot);
		if (range === null) {
			let computedTab = this.tabLevel * tabSize;
			this.currentPointerSpot = computedTab + paddingSize;
			this.currentPointerHeight = this.initialHeight;
		} else {
			let computedTab = this.tabLevel * tabSize;
			let preCaretRange = range.cloneRange();
			preCaretRange.selectNodeContents(container);
			preCaretRange.setEnd(range.endContainer, range.endOffset);
			this.atPressed = false;
			this.hashPressed = false;
			includesClock(this, container.innerText.slice(0, range.endOffset), false);
			this.characterIndex = range.endOffset;
			this.currentPointerSpot = range.getClientRects()[0] === undefined ? computedTab + paddingSize : range.getClientRects()[0].x;
			this.currentPointerHeight = range.getClientRects()[0] === undefined ? this.initialHeight : range.getClientRects()[0].y - container.getBoundingClientRect().top;
		}

	}


	moveToSpot (newSpotToMove, up) {
		let newSpot = newSpotToMove
		let container = this.shadowRoot.getElementById("textBlock");
		if (container.childNodes.length > 0) {
			if (!this.controller.resetPosition) {
				newSpot = this.currentPointerSpot;
			}
			container.focus();
			let range = shadow.getRange(this.shadowRoot);
			container.blur();
			console.log(newSpot);
			console.log(newSpot);
			setTimeout(() => {
				let offset = 0;
				if (up) {
					offset = container.textContent.length;
				}
				range.setStart(container.childNodes[0], offset);
				let currentCoordinate = range.getClientRects()[0].x;
				let currentOffset = offset;
				let counter = 0;
				newSpot = Math.floor(newSpot);
				while (counter < 1000) {
					if (up) {
						offset = offset > 0 ? offset - 1 : offset;
					} else {
						offset = offset < container.textContent.length ? offset + 1 : offset;
					}
					range.setStart(container.childNodes[0], offset);
					range.collapse(true);
					let nextCoordinate = range.getClientRects()[0].x;
					if (Math.abs(Math.floor(currentCoordinate) - newSpot) <= Math.abs(Math.floor(nextCoordinate) - newSpot)) {
						range.setStart(container.childNodes[0], currentOffset);
						break;
					}
					currentCoordinate = nextCoordinate;
					currentOffset = offset;
					counter += 1;
				}
				range.collapse(true);
				window.getSelection().removeAllRanges();
				window.getSelection().addRange(range);
				container.focus();
			}, 0.01);
		} else {
			container.focus();
		}

	}

	setupTabLevel () {
		this.style.position = "relative";
		let computedTab = this.tabLevel * tabSize;
		this.style.left = computedTab + "px";
		this.controller.currentTabLevel = this.tabLevel;
		this.setCurrentSpot();
	}

	connectedCallback () {

	}


}
*/