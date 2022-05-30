/**
 * SideCard Module
 * @module sideCardModule
 */

// JSX Engine Import
/* eslint-disable */
/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from "../jsxEngine.js";
/* eslint-enable */

let template = <template>
	<link type="text/css" rel="stylesheet" href="sideCard.css" />
    <article class="card">
        <div id="titleWrapper">
            <h1 id="title"></h1>
        </div>
        <div id="trackerWrapper">
            <div id="titleBlock">
                <div id="trackerTitle"></div>
                <div id="editorIcons" class="paragraphIcons">
                    <img src="../public/resources/sixDotIcon.png" class="unfocusedIcons" id="more" />
                </div>
            </div>
        </div>
    </article>
</template>

let sixDots = <div id="editorIcon">
    <img src="../public/resources/sixDotIcon.png" class="unfocusedIcons" id="hide" />
</div>
export class SideCard extends HTMLElement {
    constructor (title, trackers) {
        super();
        this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.setTitle(title);
        this.tracker = trackers;
        this.addTracker(trackers)
    }

    /**
     * Sets title for side card
     *
     * @param {String} cardTitle
     */
    setTitle (cardTitle) {
        const title = this.shadowRoot.getElementById("title");
        title.innerText = cardTitle;
    }

    addTracker (tracker) {
        console.log(tracker);
        const trackerTitle = this.shadowRoot.getElementById("trackerTitle");
        trackerTitle.innerText = tracker.title;
        for (let i = 0; i < tracker.content.length; i++) {
            let trackerblock = document.createElement("div");
            let trackertext = document.createElement("div");
            trackertext.classList.add("tracker-text");
            trackerblock.classList.add("tracker-block");
            trackertext.innerText = tracker.content[i];
            trackerblock.appendChild(trackertext);
            trackerblock.appendChild(sixDots.cloneNode(true));
            this.shadowRoot.getElementById("trackerWrapper").appendChild(trackerblock);
        }
    }
}
window.customElements.define("side-card", SideCard);
