/**
 * Text Block Module
 * @module textBlockModule
 */
import { BlockController } from "./blockController.js";
import { bindFunctions } from "./blockManager.js";
import { bindListeners } from "./blockListeners.js";
import { bindDropdown } from "./blockDropdownManager.js";

// JSX Engine Import
/* eslint-disable */
/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from "../jsxEngine.js";
/* eslint-enable */

export let tabSize = 20;
export let paddingSize = 10;
export let protectedKeys = ["Control", "Alt", "CapsLock", "Escape", "PageUp", "PageDown", "End", "Home", "PrintScreen", "Insert", "Delete", "Backspace", "Tab", "Enter", "Meta", "ArrowTop", "ArrowBottom", "ArrowRight", "ArrowLeft", "Shift", " "]

let blockTemplate = <template>
	<link type="text/css" rel="stylesheet" href="./block.css" />
	<div id="editorIcons" class="paragraphIcons"><img src="../public/resources/plusIcon.png" class="unfocusedIcons" id="plus" /><img src="../public/resources/sixDotIcon.png" class="unfocusedIcons" id="more" /></div>
	<div id="checkerContainer" checked=""><div id="taskChecker"></div></div>
	<div id="textBlock" contentEditable="true" ondrop={()=>false} placeholder='Type "/" to create a block'></div>
	<aside id="signifiers" class="paragraphSignifiers"><span>&#128540;</span><button>+</button></aside>
</template>;

/**
 * Class to create new editor block
 */
export class TextBlock extends HTMLElement {

	/**
	 * Editor block constructor
	 * @param {BlockController} controller - the editor's controller
	 * @param {Object} itemObject - the database item representing the editor
	 * @param {Object} signifier - the editor's current signifier
	 * @param {singleParameterCallback} callback - callback for the end of the constructor function
	 */
	constructor (controller, itemObject, signifiers, callback) {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(blockTemplate.content.cloneNode(true));
		this.characterIndex = 0;
		this.kind = "paragraph";
		this.initialHeight = 3;
		this.item = itemObject;
		this.controller = controller;
		this.shadowRoot.getElementById("textBlock").classList.add("unstylized");
		this.currentBlock = null;
		this.checkBox = this.shadowRoot.getElementById("checkerContainer");
		this.checkBox.style.display = "none";
		this.currentPointerSpot = 0;
		this.editorIcons = this.shadowRoot.getElementById("editorIcons");
		this.currentPointerHeight = 2;
		this.signifierRow = this.shadowRoot.getElementById("signifiers");
		bindFunctions(this);
		bindDropdown(this);
		if (this.controller.creatingFromBullet.isTrue) {
			if (this.controller.creatingFromBullet.kind === "note") {
				this.setupNote();
			} else if (this.controller.creatingFromBullet.kind === "event") {
				this.setupEvent();
			} else {
				this.setupTask();
			}
		}
		this.tabLevel = controller.currentTabLevel;
		this.atPressed = false;
		this.hashPressed = false;
		this.timeSetter = false;
		this.dateSetter = false;
		this.eventDelete = true;
		this.signifiers = signifiers
		this.plus = this.shadowRoot.getElementById("plus");
		this.more = this.shadowRoot.getElementById("more");
		this.setupTabLevel();
		setTimeout(() => {
			callback(true);
		}, 30);
	}

	

	/**
	 * When a textBlock is created, the editor is added to the page and if the block is a task
	 * then the text is crossed off
	 */
	connectedCallback () {
		bindListeners(this);
	}
}


window.customElements.define("text-block", TextBlock);


const SUPPORTS_SHADOW_SELECTION = typeof window.ShadowRoot.prototype.getSelection === 'function';
const SUPPORTS_BEFORE_INPUT = typeof window.InputEvent.prototype.getTargetRanges === 'function';
const IS_FIREFOX = window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

class ShadowSelection {
  constructor() {
    this._ranges = [];
  }

  getRangeAt(index) {
    return this._ranges[index];
  }

  addRange(range) {
    this._ranges.push(range);
  }

  removeAllRanges() {
    this._ranges = [];
  }

  // todo: implement remaining `Selection` methods and properties.
}

function getActiveElement() {
  let active = document.activeElement;

  while (true) {
    if (active && active.shadowRoot && active.shadowRoot.activeElement) {
      active = active.shadowRoot.activeElement;
    } else {
      break;
    }
  }

  return active;
}

if (IS_FIREFOX && !SUPPORTS_SHADOW_SELECTION) {
  window.ShadowRoot.prototype.getSelection = function() {
    return document.getSelection();
  }
}

if (!IS_FIREFOX && !SUPPORTS_SHADOW_SELECTION && SUPPORTS_BEFORE_INPUT) {
  let processing = false;
  let selection = new ShadowSelection();

  window.ShadowRoot.prototype.getSelection = function() {
    return selection;
  }

  window.addEventListener('selectionchange', () => {
    if (!processing) {
      processing = true;

      const active = getActiveElement();

      if (active && (active.getAttribute('contenteditable') === 'true')) {
        document.execCommand('indent');
      } else {
        selection.removeAllRanges();
      }

      processing = false;
    }
  }, true);

  window.addEventListener('beforeinput', (event) => {
    if (processing) {
      const ranges = event.getTargetRanges();
      const range = ranges[0];

      const newRange = new Range();

      newRange.setStart(range.startContainer, range.startOffset);
      newRange.setEnd(range.endContainer, range.endOffset);

      selection.removeAllRanges();
      selection.addRange(newRange);

      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  window.addEventListener('selectstart', (event) => {
    selection.removeAllRanges();
  }, true);
}
