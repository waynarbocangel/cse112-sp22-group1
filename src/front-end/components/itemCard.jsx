// JSX Engine Import
/* eslint-disable */
/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from "../jsxEngine.js";
/* eslint-enable */

let template = <template>
	<link type="text/css" rel="stylesheet" href="itemCard.css" />
    <article class="card">
        <div id="titleWrapper">
            <h1 id="title"></h1>
        </div>
        <h3 id="date"></h3>
        <div id="buttonWrapper">
            <button id="openButton">Open</button>
            <button id="peakButton">Peak</button>
        </div>
    </article>
</template>

export class ItemCard extends HTMLElement {
    constructor () {
        super();
        console.log(template);
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.bindOpenButton();
        this.bindPeakButton();
    }

    setTitle (cardTitle) {
        const title = this.shadowRoot.getElementById("title");
        title.innerText = cardTitle;
    }

    setDate (from, to) {
        const date = this.shadowRoot.getElementById("date");
        let dateString = "";
        switch (from % 10) {
            case 1:
                dateString = from.toString() + "st → ";
            break;
            case 2:
                dateString = from.toString() + "nd → ";
            break;
            case 3:
                dateString = from.toString() + "rd → ";
                break;
            default:
                dateString = from.toString() + "th → ";
        }
        switch (to % 10) {
            case 1:
                dateString = dateString + from.toString() + "st";
            break;
            case 2:
                dateString = dateString + from.toString() + "nd";
            break;
            case 3:
                dateString = dateString + from.toString() + "rd";
                break;
            default:
                dateString = dateString + from.toString() + "th";
        }
        date.innerText = dateString;
    }

    bindOpenButton () {
        this.shadowRoot.getElementById("openButton").addEventListener(() => {
            let pressed = this.shadowRoot.getElementById("title").innerText + " open button was pressed!";
            console.log(pressed);
        })
    }

    bindPeakButton () {
        this.shadowRoot.getElementById("peakButton").addEventListener(() => {
            let pressed = this.shadowRoot.getElementById("title").innerText + " peak button was pressed!";
            console.log(pressed);
        })
    }
}

window.customElements.define("item-card", ItemCard);
