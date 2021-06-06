const template = document.createElement("template");

template.innerHTML = `
    <style>
        @font-face {
            font-family:"SF-Pro";
            src: url("./public/fonts/SF-Pro.ttf");
        }
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
            background-color: #fefefe;
            margin: auto;
            position: fixed;
            border: 1px solid #888;
            width: 40%;
            height: 70%;
            left: 30vw;
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
            
        }

        .close:hover,
        .close:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }

        /* Set Label For each log*/
        label[for=month],label[for=future],label[for=daily] {
            font-size: 3vw;
            white-space: nowrap;
            position: absolute;
			text-align: center;
            font-weight: 1000;
			left:8.7vw;
            top:5vh;
        }

        /* Monthly Log Start */
        label[for=pick-month] {
            font-size: 2vw;
            white-space: nowrap;
            position: absolute;
            text-align: center;
            left:7.5vw;
            top: 23vh;
            font-weight: 400;
        }

        input[type=month] {
            position: absolute;
            top: 33vh;
            left:7.5vw;
            width:25vw;
            height: 5vh;
            padding-left: 20px;
        }

        input[type=submit] {
            background-color: #4CAF50;
            border: none;
            font-size: 1.7vw;
            font-weight:400;
            color: white;
            cursor: pointer;
            position: absolute;
            bottom:5vh;
            left:17vw;
        }
        
        form.monthly {
            display:none;
        }

        /* Monthly Log End */


        /* Future Log Start */
        label[for=future-from] {
            font-size: 2vw;
            white-space: nowrap;
            position: absolute;
            text-align: center;
            left:7.5vw;
            top: 18vh;
            font-weight: 400;
        }

        label[for=future-to] {
            font-size: 2vw;
            white-space: nowrap;
            position: absolute;
            text-align: center;
            left:7.5vw;
            top: 36vh;
            font-weight: 400;
        }

        input[name=future-from] {
            position: absolute;
            top: 25vh;
            left:7.5vw;
            width:25vw;
            height: 5vh;
            padding-left: 20px;
        }

        input[name=future-to] {
            position: absolute;
            top: 43vh;
            left:7.5vw;
            width:25vw;
            height: 5vh;
            padding-left: 20px;
        }

        form.future {
            display:default;
        }

        /* Future Log End */

        /* Daily Log Start */
        form.daily {
            display:none;
        }


        /* Daily Log End */
        label[for=daily-title] {
            font-size: 2vw;
            white-space: nowrap;
            position: absolute;
            text-align: center;
            left:7.5vw;
            top: 23vh;
            font-weight: 400;
        }

        input[name=daily] {
            position: absolute;
            top: 33vh;
            left:7.5vw;
            width:25vw;
            height: 5vh;
            padding-left: 20px;
        }
    </style>

    <button id="myBtn">Open</button>

    <!-- The Modal -->
    <div id="popup" class="popup">

      <!-- Modal content -->
        <div class="popup-content">
            <span class="close">&times;</span>

            <!-- Monthly Log -->
            <form class="monthly">
                <label for="month">New Monthly Log </label>
                <br><br>
                <label for="pick-month"> Pick a Month:</label>
                <input type="month" id="monthly" name="monthly">
                <br><br>
                <input type="submit" value="Create"> 
            </form>

            <!-- Future Log -->
            <form class="future">
                <label for="month">New Future Log </label>
                <br><br>
                <label for="future-from"> From:</label>
                <input type="date" id="future-from" name="future-from">
                <br><br>
                <label for="future-to"> To:</label>
                <input type="date" id="future-to" name="future-to">
                <input type="submit" value="Create"> 
            </form>

            <!-- Daily Log -->
            <form class="daily">
                <label for="daily">New Daily Log </label>
                <br><br>
                <label for="daily-title">Title:</label><br><br>
                <input type="text" id="daily" name="daily">
                <input type="submit" value="Create"> 
              </form>
        </div>

    </div>
`;

export class CreateEntries extends HTMLElement {
	constructor () {
		super();
		this.attachShadow({mode: "open"});
		this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.popup = this.shadowRoot.getElementById("popup");

        // Get the button that opens the popup
        this.btn = this.shadowRoot.getElementById("myBtn");

        // Get the <span> element that closes the popup
        this.span = this.shadowRoot.querySelectorAll("span")[0];

        // When the user clicks the button, open the popup
        this.btn.addEventListener("click", () => {
			this.popup.style.display = "block";
		});

        // When the user clicks on <span> (x), close the popup
        this.span.addEventListener("click", () => {
			this.popup.style.display = "none";
		});

        /*
         *When the user clicks anywhere outside of the popup, close it
         *NOTE: THIS IS NOT WORKING
         */
        /*
         * This.window.addEventListener("click", ()=> {
         *     if (event.target === popup) {
         *         this.popup.style.display = "none";
         *       }
         * });
         */
	}
}

customElements.define("create-entries", CreateEntries);
