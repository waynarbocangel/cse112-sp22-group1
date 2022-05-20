import { CalendarDay } from "./calendarDay.jsx";

// JSX Engine Import
/* eslint-disable */
/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from "../jsxEngine.js";
/* eslint-enable */

let calendarTemplate = <template>
	<link type="text/css" rel="stylesheet" href="calendar.css" />
	<header>
		<h1>Sunday</h1>
		<h1>Monday</h1>
		<h1>Tuesday</h1>
		<h1>Wednesday</h1>
		<h1>Thursday</h1>
		<h1>Friday</h1>
		<h1>Saturday</h1>
	</header>
	<section id="days"></section>
</template>;

export class Calendar extends HTMLElement {
	/**
	 * 
	 * @param {Date} month 
	 * @param {Number} start 
	 * @param {Number} end
	 * @param {Array<JournalEvent>} events 
	 * @param {Array<Log>} logs 
	 */
	constructor(month, start, end, events, logs) {
		super()
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(calendarTemplate.content.cloneNode(true));
		this.days = this.shadowRoot.getElementById("days");
		let firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
		let lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);
		let totalLines = Math.ceil((lastDay.getDate() - firstDay.getDate() + firstDay.getDay()) / 7);
		let shouldMove = false;
		let eventsMap = new Map();
		events.forEach(newEvent => {
			if (eventsMap.get(newEvent.date.getDate())) {
				let currentEvents = eventsMap.get(newEvent.date.getDate());
				console.log(currentEvents);
				currentEvents.push(newEvent.title);
				console.log(currentEvents);
				eventsMap.set(newEvent.date.getDate(), currentEvents);
				console.log(eventsMap);
			} else {
				eventsMap.set(newEvent.date.getDate(), [newEvent.title]);
			}
		});
		for (let i = 0; i < totalLines; i++) {
			for (let k = 0; k < 7; k++) {
				if ((shouldMove && (i + 1 < totalLines) ||  (i + 1 === totalLines && k < lastDay.getDay())) || (i == 0 && k == firstDay.getDay())) {
					let currentDate = new Date(firstDay.getFullYear(), firstDay.getMonth(), k + (i * 7) + 1);
					let inRange = (currentDate.getDate() >= start || currentDate.getDate() <= end);
					let currentLog = inRange ? logs[k + (i * 7)] : null;
					console.log(inRange);
					let newBlock = new CalendarDay(currentDate, eventsMap.get(currentDate.getDate()), currentLog, inRange);
					this.days.appendChild(newBlock);
					shouldMove = true;
					continue;
				}
				this.days.appendChild(new CalendarDay(null, undefined, null, false));
			}
		}
	}
}

window.customElements.define("log-calendar", Calendar);
