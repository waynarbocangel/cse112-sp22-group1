import * as localStorage from "../localStorage/userOperations.js";
import { DropdownBlock } from "./dropdown.js";

const template = document.createElement("template");
const datePickerStyles = `.qs-datepicker-container{font-size:1rem;font-family:sans-serif;color:#000;position:absolute;width:15.625em;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;z-index:9001;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid grey;border-radius:.263921875em;overflow:hidden;background:#fff;-webkit-box-shadow:0 1.25em 1.25em -.9375em rgba(0,0,0,.3);box-shadow:0 1.25em 1.25em -.9375em rgba(0,0,0,.3)}.qs-datepicker-container *{-webkit-box-sizing:border-box;box-sizing:border-box}.qs-centered{position:fixed;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.qs-hidden{display:none}.qs-overlay{position:absolute;top:0;left:0;background:rgba(0,0,0,.75);color:#fff;width:100%;height:100%;padding:.5em;z-index:1;opacity:1;-webkit-transition:opacity .3s;transition:opacity .3s;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.qs-overlay.qs-hidden{opacity:0;z-index:-1}.qs-overlay .qs-overlay-year{background:rgba(0,0,0,0);border:none;border-bottom:1px solid #fff;border-radius:0;color:#fff;font-size:.875em;padding:.25em 0;width:80%;text-align:center;margin:0 auto;display:block}.qs-overlay .qs-overlay-year::-webkit-inner-spin-button{-webkit-appearance:none}.qs-overlay .qs-close{padding:.5em;cursor:pointer;position:absolute;top:0;right:0}.qs-overlay .qs-submit{border:1px solid #fff;border-radius:.263921875em;padding:.5em;margin:0 auto auto;cursor:pointer;background:hsla(0,0%,50.2%,.4)}.qs-overlay .qs-submit.qs-disabled{color:grey;border-color:grey;cursor:not-allowed}.qs-overlay .qs-overlay-month-container{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1}.qs-overlay .qs-overlay-month{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:calc(100% / 3);cursor:pointer;opacity:.5;-webkit-transition:opacity .15s;transition:opacity .15s}.qs-overlay .qs-overlay-month.active,.qs-overlay .qs-overlay-month:hover{opacity:1}.qs-controls{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:0;flex-shrink:0;background:#d3d3d3;-webkit-filter:blur(0);filter:blur(0);-webkit-transition:-webkit-filter .3s;transition:-webkit-filter .3s;transition:filter .3s;transition:filter .3s,-webkit-filter .3s}.qs-controls.qs-blur{-webkit-filter:blur(5px);filter:blur(5px)}.qs-arrow{height:1.5625em;width:1.5625em;position:relative;cursor:pointer;border-radius:.263921875em;-webkit-transition:background .15s;transition:background .15s}.qs-arrow:hover{background:rgba(0,0,0,.1)}.qs-arrow:hover.qs-left:after{border-right-color:#000}.qs-arrow:hover.qs-right:after{border-left-color:#000}.qs-arrow:after{content:"";border:.390625em solid rgba(0,0,0,0);position:absolute;top:50%;-webkit-transition:border .2s;transition:border .2s}.qs-arrow.qs-left:after{border-right-color:grey;right:50%;-webkit-transform:translate(25%,-50%);-ms-transform:translate(25%,-50%);transform:translate(25%,-50%)}.qs-arrow.qs-right:after{border-left-color:grey;left:50%;-webkit-transform:translate(-25%,-50%);-ms-transform:translate(-25%,-50%);transform:translate(-25%,-50%)}.qs-month-year{font-weight:700;-webkit-transition:border .2s;transition:border .2s;border-bottom:1px solid rgba(0,0,0,0);cursor:pointer}.qs-month-year:hover{border-bottom:1px solid grey}.qs-month-year:active:focus,.qs-month-year:focus{outline:none}.qs-month{padding-right:.5ex}.qs-year{padding-left:.5ex}.qs-squares{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;padding:.3125em;-webkit-filter:blur(0);filter:blur(0);-webkit-transition:-webkit-filter .3s;transition:-webkit-filter .3s;transition:filter .3s;transition:filter .3s,-webkit-filter .3s}.qs-squares.qs-blur{-webkit-filter:blur(5px);filter:blur(5px)}.qs-square{width:calc(100% / 7);height:1.5625em;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;cursor:pointer;-webkit-transition:background .1s;transition:background .1s;border-radius:.263921875em}.qs-square:not(.qs-empty):not(.qs-disabled):not(.qs-day):not(.qs-active):hover{background:orange}.qs-current{font-weight:700;text-decoration:underline}.qs-active,.qs-range-end,.qs-range-start{background:#add8e6}.qs-range-start:not(.qs-range-6){border-top-right-radius:0;border-bottom-right-radius:0}.qs-range-middle{background:#d4ebf2}.qs-range-middle:not(.qs-range-0):not(.qs-range-6){border-radius:0}.qs-range-middle.qs-range-0{border-top-right-radius:0;border-bottom-right-radius:0}.qs-range-end:not(.qs-range-0),.qs-range-middle.qs-range-6{border-top-left-radius:0;border-bottom-left-radius:0}.qs-disabled,.qs-outside-current-month{opacity:.2}.qs-disabled{cursor:not-allowed}.qs-day,.qs-empty{cursor:default}.qs-day{font-weight:700;color:grey}.qs-event{position:relative}.qs-event:after{content:"";position:absolute;width:.46875em;height:.46875em;border-radius:50%;background:#07f;bottom:0;right:0}`;
const futureLogCreator = `
<span class="close">&times;</span>
<form class="future">
	<label for="month">New Future Log </label>
	<br><br>
	<label for="future-from">From:</label>
	<br>
	<input id="futureFrom" name="future-from">
	<br><br>
	<label for="future-to">To:</label>
	<br>
	<input id="futureTo" name="future-to">
	<br><br>
</form>
<div id="createButton">Create <img id="loadingWheel" style="display: none;" src="../public/resources/loading.gif"/></div>
`;
const monthlyLogCreator = `
<span class="close">&times;</span>
<form class="monthly">
	<label for="month">New Monthly Log </label>
	<br><br>
	<label for="pick-month"> Pick a Month:</label>
	<input type="month" id="monthly" name="monthly">
	<br><br>
</form>
<div id="createButton">Create</div>
`;
const dailyLogCreator = `
<span class="close">&times;</span>
<form class="daily">
	<label for="daily">New Daily Log </label>
	<br><br>
	<label for="daily-title">Title:</label><br><br>
	<input type="text" id="daily" name="daily">
	<br><br>
</form>
<div id="createButton">Create</div>
`;
const collectionCreator = `
<span class="close">&times;</span>
<form class="daily">
	<label for="daily">New Collection</label>
	<br><br>
	<label for="daily-title">Title:</label><br><br>
	<input type="text" id="daily" name="daily">
	<br><br>
</form>
<div id="createButton">Create</div>
`;

template.innerHTML = `
    <style>
        @font-face {
            font-family:"SF-Pro";
            src: url("../public/fonts/SF-Pro.ttf");
        }

		${datePickerStyles}

        :host {
            font-family: "SF-Pro";
        }
        
        /* The Popup background */
        .popup {
            font-family:'SF-Pro';
            background: white;
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            padding-top: 100px; /* Location of the box */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }

        /* Pop up  window */
        .popup-content {
			font-family: "SF-Pro";
            background-color: #fefefe;
			display: block;
            position: fixed;
			top: 50%;
			transform: translateY(-50%);
            border: 1px solid #888;
            width: 40%;
            height: 70%;
			min-height: 450px;
			min-width: 400px;
            left: 30vw;
			border-radius: 10px;
        }

        /* The Close Button */
        .close {
            color: #aaaaaa;
            float: right;
            font-size: 3vw;
            font-weight: bold;
            position: absolute;
            right: 2vw;
            top: 2vh;
			z-index: 2;
            
        }

        .close:hover,
        .close:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }

        /* Set Label For each log*/
        label[for=month],label[for=future],label[for=daily] {
            font-size: 48px;
			text-align: center;
            font-weight: 1000;
			width: 100%;
            top: 4vh;
        }

        /* Monthly Log Start */
        label[for=pick-month] {
            font-size: 2vw;
            white-space: nowrap;
            text-align: center;
            top: 45px;
            font-weight: 400;
        }

        input[type=month] {
            top: 45px;
            width:25vw;
            height: 5vh;
            padding-left: 20px;
        }

        #createButton {
            background-color: #000;
            border: none;
            font-size: 1.7vw;
            font-weight:400;
            color: white;
            cursor: pointer;
			text-align: center;
			position: absolute;
			bottom: 20px;
			left: calc(50% - 70px);
			width: 140px;
			padding: 5px 0;
			border-radius: 10px;
        }

		#loadingWheel {
			position: absolute;
			width: 20px;
			height: 100%;
			right: 5px;
			top: 0;
			object-fit: contain;
		}

        /* Monthly Log End */


        /* Future Log Start */
        label[for=future-from] {
            font-size: 2vw;
            white-space: nowrap;
			margin-left: -12px;
            top: 45px;
			width: 25vw;
            font-weight: 400;
        }

        label[for=future-to] {
            font-size: 2vw;
            white-space: nowrap;
			margin-left: -12px;
            top: 45px;
			width:25vw;
            font-weight: 400;
        }

        input[name=future-from] {
            top: 45px;
            width:25vw;
            height: 5vh;
            padding-left: 20px;
        }

        input[name=future-to] {
            top: 45px;
            width:25vw;
            height: 5vh;
            padding-left: 20px;
        }

        /* Daily Log End */
        label[for=daily-title] {
            font-size: 2vw;
            white-space: nowrap;
            text-align: center;
            top: 45px;
			width:25vw;
            font-weight: 400;
        }

        input[name=daily] {
            top: 45px;
            width:25vw;
            height: 5vh;
            padding-left: 20px;
        }
		label {
			display: inline-block;
			position: relative;
			left: 50%;
			transform: translateX(-50%);
		}

		input {
			display: block;
			position: relative;
			left: 50%;
			transform: translateX(-50%);
		}
    </style>

    <!-- The Modal -->
    <div id="popup" class="popup">
		<!-- Modal content -->
		<div class="popup-content"></div>
		
    </div>
`;

/**
 * Class that creates a creation Menu
 */
export class CreationMenu extends HTMLElement {
	/**
	 * constructor for CreationMenu
	 * @param {String} kind the kind of log to make menu for
	 */
	constructor (kind) {
		super();
		this.attachShadow({mode: "open"});
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.startPicker = null;
		this.endPicker = null;
        this.popup = this.shadowRoot.getElementById("popup");
		this.content = this.shadowRoot.querySelector(".popup-content");
		this.span = null;
		this.create = null;
		this.setKind(kind);

        // Get the <span> element that closes the popup
	}

	/**
	 * show the menu
	 */
	show(){
		this.popup.style.display = "block";
	}

	/**
	 * set the kind of menu to a passed in kind
	 * @param {String} kind the replacement kind
	 */
	setKind(kind){
		if (kind === "futureLog") {
			this.content.innerHTML = futureLogCreator;
			if (this.startPicker !== null && this.endPicker !== null) {
				this.startPicker.remove();
				this.endPicker.remove();
			}
			this.startPicker = datepicker(this.shadowRoot.getElementById("futureFrom"), {id: 1});
			this.endPicker = datepicker(this.shadowRoot.getElementById("futureTo"), {id: 1});
		} else if (kind === "monthlyLog") {
			this.content.innerHTML = monthlyLogCreator;
		} else if (kind === "dailyLog") {
			this.content.innerHTML = dailyLogCreator;
		} else if (kind === "collection") {
			this.content.innerHTML = collectionCreator;
		}
		this.span = this.shadowRoot.querySelectorAll("span")[0];
		this.create = this.shadowRoot.getElementById("createButton");
		this.span.addEventListener("click", () => {
			console.log("here");
			this.popup.style.display = "none";
		});
		this.create.addEventListener("click", () => {
			if (kind === "futureLog") {
				let loadingWheel = this.shadowRoot.getElementById("loadingWheel");
				loadingWheel.style.display = "block";
				let start = new Date(this.shadowRoot.getElementById("futureFrom").value);
				let end = new Date(this.shadowRoot.getElementById("futureTo").value);
				console.log(start);
				console.log(end);
				localStorage.createFutureLog(start, end, [], [], true, (err, futureLog) => {
					if (err) {
						console.log(err);
					} else if (futureLog) {
						localStorage.readUser((error, user) => {
							if(error){
								console.log(error);
							} else {
								let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
								let contentWrapper = document.getElementById("contentWrapper");
								let futureLogStart = new Date(futureLog.startDate);
								let futureLogEnd = new Date(futureLog.endDate);
								let dropdown = new DropdownBlock(`Future Log ${monthNames[futureLogStart.getMonth()]} ${futureLogStart.getFullYear()} - ${monthNames[futureLogEnd.getMonth()]} ${futureLogEnd.getFullYear()}`, futureLog, 1);
								contentWrapper.insertBefore(dropdown, contentWrapper.lastChild);

								if (contentWrapper.childNodes.length === 1) {
									dropdown.titleWrapper.classList.add("singleItemWrapper");
								}

								for (let j = 0; j < futureLog.months.length; j++) {
									let currentMonth = user.monthlyLogs.filter((month) => month.id === futureLog.months[j].monthlyLog)[0];
									let dropdownMonth = new DropdownBlock(`${monthNames[new Date(currentMonth.date).getMonth()]} ${new Date(currentMonth.date).getFullYear()}`, currentMonth, 2);
									dropdown.contentWrapper.appendChild(dropdownMonth);
									for (let k = 0; k < currentMonth.days.length; k++) {
										let currentDay = user.dailyLogs.filter((day) => day.id === currentMonth.days[k].dailyLog)[0];
										let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
										let dropdownDay = new DropdownBlock(`${weekDays[new Date(currentDay.date).getDay()]}, ${monthNames[new Date(currentDay.date).getMonth()]} ${new Date(currentDay.date).getUTCDate()}`, currentDay, 3);
										dropdownMonth.contentWrapper.appendChild(dropdownDay);
									}
								}
								loadingWheel.style.display = "none";
								this.popup.style.display = "none";
								dropdown.scrollIntoView({behavior: "smooth"});
							}
						});
					}
				})
			}
		})
	}
}

customElements.define("creation-menu", CreationMenu);
