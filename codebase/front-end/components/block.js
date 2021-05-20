import {blockArray} from "../index.js";
import * as shadow from "./shadow.js";

const tabSize = 20;
const paddingSize = 10;

const blockTemplate = document.createElement('template');

blockTemplate.innerHTML = `<template id="block">
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
			width: 94%;   
		}

		#textBlock:empty::before{
			content: attr(placeholder);
			color: gray;
		}

		.unstylized{
			margin: 7px 0 12px;
			font-size: 18px;
			line-height: 28px;
		}

		.note{
			margin: 0;
			position: relative;
			font-size: 18px;
			line-height: 28px;
			display: inline-block;
			vertical-align: top;
		}

		.header1{
			font-size: 42px;
			line-height: 50px;
			font-weight: bold;
			color: black;
			margin: 15px 0 20px;
		}

		.header2{
			font-size: 30px;
			line-height: 36px;
			font-weight: bold;
			color: black;
			margin: 8px 0 13px;
		}
	</style>
	<div id="textBlock" contenteditable="true" placeholder='Type "/" to create a block'></div>
</template>`;

export class TextBlock extends HTMLElement{
	constructor(controller, callback){
		super();
        this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(blockTemplate.content.cloneNode(true));
		this.root = this.shadowRoot;
		this.kind = "paragraph";
		this.initialHeight = 3;
		this.controller = controller;
		// this.shadowRoot.getElementById("textBlock").classList.add("unstylized");
		this.currentBlock = null;
		this.currentPointerSpot = 0;
		this.currentPointerHeight = 2;
		if (this.controller.creatingFromBullet){
			this.setupBullet();
		}
		this.tabLevel = controller.currentTabLevel;
		this.setupTabLevel();
		callback(true);
	}

    setCurrentSpot(){
        let container = this.shadowRoot.getElementById("textBlock");
        let range = shadow.getRange(this.shadowRoot);
        if (range != undefined){
            let preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(container);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            this.currentPointerSpot = (range.getClientRects()[0] != undefined) ? range.getClientRects()[0].x : (this.tabLevel * tabSize) + paddingSize;
            this.currentPointerHeight = (range.getClientRects()[0] != undefined) ? range.getClientRects()[0].y - container.getBoundingClientRect().top : this.initialHeight;
        } else {
            this.currentPointerSpot = (this.tabLevel * tabSize) + paddingSize;
            this.currentPointerHeight = this.initialHeight;
        }
        
    }

    moveToSpot(newSpot, up){
        let container = this.shadowRoot.getElementById("textBlock");
        if (container.childNodes.length > 0){
            if (!this.controller.resetPosition){
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
                while(counter < 1000){
                    if (up){
                        offset = (offset > 0) ? offset - 1 : offset;
                    } else {
                        offset = (offset < container.textContent.length) ? offset + 1 : offset;
                    }
                    range.setStart(container.childNodes[0], offset);
                    range.collapse(true);
                    let nextCoordinate = range.getClientRects()[0].x;
                    if (Math.abs(Math.floor(currentCoordinate) - newSpot) <= Math.abs(Math.floor(nextCoordinate) - newSpot)){
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

    setupHeader1(){
        let textBlock = this.shadowRoot.getElementById("textBlock");
        while(textBlock.classList.length > 0){
            textBlock.classList.remove(textBlock.classList[0]);
        }
        while(this.classList.length > 0){
            this.classList.remove(this.classList[0]);
        }
        this.controller.creatingFromBullet = false;
        this.kind = "header1";
        this.initialHeight = 0;
        textBlock.setAttribute("placeholder", "Header 1");
        textBlock.classList.add("header1");
        textBlock.innerHTML = "";
    }

    setupHeader2(){
        let textBlock = this.shadowRoot.getElementById("textBlock");
        while(textBlock.classList.length > 0){
            textBlock.classList.remove(textBlock.classList[0]);
        }
        while(this.classList.length > 0){
            this.classList.remove(this.classList[0]);
        }
        this.controller.creatingFromBullet = false;
        this.kind = "header 2";
        this.initialHeight = 0;
        textBlock.setAttribute("placeholder", "Header 2");
        textBlock.classList.add("header2");
        textBlock.innerHTML = "";
    }

    setupBullet(){
        let textBlock = this.shadowRoot.getElementById("textBlock");
        while(textBlock.classList.length > 0){
            textBlock.classList.remove(textBlock.classList[0]);
        }
        while(this.classList.length > 0){
            this.classList.remove(this.classList[0]);
        }
        this.controller.creatingFromBullet = true;
        this.kind = "bullet";
        this.initialHeight = 3;
        textBlock.setAttribute("placeholder", "Note");
        this.classList.add("noteContainer");
        textBlock.classList.add("note");
        textBlock.innerHTML = "";
    }

    removeStyles(){
        let textBlock = this.shadowRoot.getElementById("textBlock");
        while(textBlock.classList.length > 0){
            textBlock.classList.remove(textBlock.classList[0]);
        }
        while(this.classList.length > 0){
            this.classList.remove(this.classList[0]);
        }
        this.kind = "paragraph";
        this.initialHeight = 3;
        textBlock.classList.add("unstylized");
        textBlock.setAttribute("placeholder", 'Type "/" to create a block');
        textBlock.innerHTML = "";
        this.controller.creatingFromBullet = false;
    }

    setupTabLevel(){
        this.style.position = "relative";
        this.style.left = (this.tabLevel * tabSize) + "px";
        this.controller.currentTabLevel = this.tabLevel;
        this.setCurrentSpot();
    }

	connectedCallback(){
		let textBlock = this.shadowRoot.getElementById("textBlock");
		textBlock.focus();
        
        document.addEventListener(shadow.eventName, () => {
            blockArray[this.controller.currentBlockIndex].setCurrentSpot();
        });

		textBlock.addEventListener("input",() =>{
			let content = textBlock.innerHTML;
            this.setCurrentSpot();
			if (content == "#&nbsp;"){
				this.setupHeader1();
			} else if (content == "##&nbsp;"){
				this.setupHeader2();
			} else if (content == "-&nbsp;"){
				this.setupBullet();
			} else if (content == "<div><br></div>"){
				this.removeStyles();
			} else if (content == "<br>"){
                textBlock.innerHTML = "";
            } else if (textBlock.textContent != ""){
                this.controller.resetPosition = true;
            }
		});

        textBlock.onfocus = (e) => {
            this.controller.resetPosition = false;
            this.setCurrentSpot();
            this.controller.currentBlockIndex = blockArray.indexOf(this);
            this.controller.currentTabLevel = this.tabLevel;
            if (this.classList.contains("noteContainer")){
                this.controller.creatingFromBullet = true;
            } else {
                this.controller.creatingFromBullet = false;
            }
        };

        

		textBlock.onkeydown = (e)=>{
			let key = e.key || e.keyCode;
			if (key == "Backspace" || key == "Delete"){
                let tabLevelNotZero = this.tabLevel > 0;
                let currentSpot18 = this.currentPointerSpot - (this.tabLevel * tabSize) == paddingSize;
                let currentSpotNote = this.currentPointerSpot - (this.tabLevel * tabSize) == paddingSize + 20 && this.classList.contains("noteContainer");
                let isAtBegining = currentSpot18 || currentSpotNote;
                if (textBlock.innerHTML == "" && textBlock.getAttribute('placeholder') == 'Type "/" to create a block' && blockArray.length > 1){
                    this.controller.removeBlock();
                } else if((textBlock.innerHTML == "" || textBlock.innerHTML == "<br>") && this.tabLevel == 0){
					this.removeStyles();
				} else if (tabLevelNotZero && isAtBegining){
                    this.tabLevel -= 1;
                    this.setupTabLevel();
                }
			} else if (key == "Enter"){
				let content = textBlock.innerHTML;
				if (content == "/h1"){
					this.setupHeader1();
					e.preventDefault();
				} else if (content == "/h2"){
					this.setupHeader2()
					e.preventDefault();
				} else if (content == "/note"){
					this.setupBullet();
                    e.preventDefault();
				} else {
                    this.controller.resetPosition = false;
                    this.controller.addNewBlock();
                    e.preventDefault();
                }
			} else if (key == "ArrowDown"){
                let lineheight = (textBlock.classList.contains("header1")) ? 80 : ((textBlock.classList.contains("header2")) ? 57 : ((this.kind == "bullet") ? 47 : 42));
                if (this.currentPointerHeight > textBlock.offsetHeight - lineheight){
                    this.controller.moveToNextBlock();
                } 
            } else if (key == "ArrowUp"){
                let lineheight = (textBlock.classList.contains("header1")) ? 50 : ((textBlock.classList.contains("header2")) ? 36 : 28);
                if (this.currentPointerHeight < lineheight + this.initialHeight){
                    this.controller.moveToPreviousBlock();
                } 
            } else if (key == "Tab"){
                this.tabLevel += 1;
                this.setupTabLevel();
                e.preventDefault();
            }

		};

        textBlock.onkeyup = (e) => {
            let key = e.key || e.keyCode;
            if (key == "ArrowRight" || key == "ArrowLeft" || key == "ArrowDown" || key == "ArrowUp"){
                this.setCurrentSpot();
                if (key == "ArrowRight" || key == "ArrowLeft"){
                    this.controller.resetPosition = true;
                }
            }
        };
	}
}


window.customElements.define('text-block', TextBlock);