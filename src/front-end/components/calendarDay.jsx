// JSX Engine Import
/* eslint-disable */
/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from "../jsxEngine.js";
/* eslint-enable */

let today = new Date();

let dayTemplate = <template>
	<link type="text/css" rel="stylesheet" href="calendarDay.css" />
	<section id="content">
		<h1 id="title"></h1>
		<main id="events"></main>
		<footer id="footer"></footer>
	</section>
</template>;

export class CalendarDay extends HTMLElement {
	/**
	 * Constructs a new CalendarDay
	 * @param {Date?} date 
	 * @param {Array<String>} events
	 * @param {Log} log
	 * @param {Boolean} inRange
	 */
	constructor(date, events, log, inRange) {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(dayTemplate.content.cloneNode(true));
		this.dayTitle = this.shadowRoot.getElementById("title");
		this.content = this.shadowRoot.getElementById("content");
		this.eventSection = this.shadowRoot.getElementById("events");
		this.footerSection = this.shadowRoot.getElementById("footer");
		if (date) {
			this.dayTitle.innerHTML = date.getDate();
			this.content.classList.add("isDate");
			if (date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()) {
				this.dayTitle.className = "today";
			}
		}

		if (events) {
			for (let i = 0; i < events.length && i < 3; i++) {
				let newEvent = events[i];
				this.eventSection.appendChild(<h2 class="event">{newEvent}</h2>);
			}
		}
		
		if (log){
			if (log.content.length == 0 && inRange) {
				this.dayTitle.classList.add("unlogged")
				this.eventSection.classList.add("unlogged");
				this.footerSection.appendChild(<button id="create" onClick={this.createLog}>Start Log</button>);
			} else if (inRange) {
				this.footerSection.appendChild(<button id="open" onClick={this.openLog}>Open</button>);
				this.footerSection.appendChild(<button id="peak" onClick={this.peakInto}>Peak</button>);
			}
		} else if (this.dayTitle.innerHTML){
			this.content.classList.add("dim");
			this.dayTitle.classList.add("extend");
			this.eventSection.classList.add("extend");
			this.footerSection.appendChild(<button id="extend">Extend Log</button>);
		} else {
			this.content.classList.add("dimmer");
		}
	}

	/**
	 * Opens the log for this date 
	 */
	openLog = () =>{
		alert("Log should be opened");
	}

	/**
	 * Peaks into the log for this date
	 */
	peakInto = () =>{
		alert("Log should show peak");
	}

	/** 
	 * Creates new log at a given date
	 */
	createLog = () => {
		alert("Creating log");
	}
}

window.customElements.define("calendar-day", CalendarDay);