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
		<aside id="eventsMobile"></aside>
		<footer id="footer"></footer>
	</section>
</template>;

export class CalendarDay extends HTMLElement {
	/**
	 * Constructs a new CalendarDay
	 * @param {Calendar} calendar
	 * @param {Date?} date 
	 * @param {Array<String>} events
	 * @param {Log} log
	 * @param {Boolean} inRange
	 */
	constructor(calendar, date, events, log, inRange) {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(dayTemplate.content.cloneNode(true));
		this.calendar = calendar;
		this.dayTitle = this.shadowRoot.getElementById("title");
		this.content = this.shadowRoot.getElementById("content");
		this.eventSection = this.shadowRoot.getElementById("events");
		this.eventMobile = this.shadowRoot.getElementById("eventsMobile");
		this.footerSection = this.shadowRoot.getElementById("footer");
		if (date) {
			this.dayTitle.innerHTML = date.getDate();
			this.content.classList.add("isDate");
			if (date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()) {
				this.dayTitle.className = "today";
				this.content.classList.add("isSelected");
				this.calendar.lastSelected = this;
			}
		}

		if (events) {
			for (let i = 0; i < events.length && i < 3; i++) {
				let newEvent = events[i];
				this.eventSection.appendChild(<h2 class="event">{newEvent}</h2>);
				this.eventMobile.appendChild(<div class="eventCircle"></div>);
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
	 * Selects day when on mobile
	 */
	selectDay = () => {
		if (window.innerWidth <= 1024 && this.dayTitle.innerHTML) {
			this.calendar.newDaySelected(this);
			this.content.classList.add("isSelected");
		}
	}

	deselectDay = () => {
		this.content.classList.remove("isSelected");
	}

	/**
	 * Opens the log for this date 
	 */
	openLog = () => {
		if (this.eventMobile.style.display === "none") {
			alert("Log should be opened");
		}
	}

	/**
	 * Peaks into the log for this date
	 */
	peakInto = () => {
		alert("Log should show peak");
	}

	/** 
	 * Creates new log at a given date
	 */
	createLog = () => {
		alert("Creating log");
	}

	connectedCallback() {
		this.content.onclick = () => {
			this.selectDay();
		}

		this.dayTitle.onclick = () => {
			this.openLog();
		}
	}
}

window.customElements.define("calendar-day", CalendarDay);