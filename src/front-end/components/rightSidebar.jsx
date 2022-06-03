/**
 * SideCard Module
 * @module rightSidebarModule
 */

// JSX Engine Import
/* eslint-disable */
/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from "../jsxEngine.js";
/* eslint-enable */
import {SideCard} from "./sideCard.jsx";

let template = <template>
    <link type="text/css" rel="stylesheet" href="rightSidebar.css" />
    <article id="container">
        <div id="sideCardWrapper"></div>
        <button id="createNewGoal">New Goal</button>
    </article>
</template>

export class RightSidebar extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.addCard("testing", {id: "abc",
			objectType: "tracker",
			title: "testing",
			parent: "a",
			content: []});
    }

    addCard (title, tracker) {
        const card = new SideCard(title, tracker);
        card.id = "sideCard";
        this.shadowRoot.getElementById("sideCardWrapper").appendChild(card);
    }
}
window.customElements.define("right-sidebar", RightSidebar);
