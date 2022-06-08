import * as localStorage from "../localStorage/userOperations.js";
import { adderDropdown, contentWrapper, creationMenu, header, search } from "../index.js"
import { FileLocation } from "../components/fileLocation.jsx";
import { IndexDropdown } from "../components/indexDropdown.jsx";
import { currentState } from "./stateManager.js";


/**
 * Sets up the index page with the futureLogs and collections of the user.
 */


export function setupIndex () {
	localStorage.readUser((err, user) => {
		if (err) {
			console.log(err);
		} else {
			header.loadSearchbar();
			let child = header.file.lastElementChild;
			while (child) {
				header.file.removeChild(child);
				child = header.file.lastElementChild;
			}
			header.file.appendChild(new FileLocation("Index", "index", null, false));
			let displayToggle = document.createElement("button");
			displayToggle.id = "displayToggle";
			displayToggle.innerHTML = "&#x25BC;   Future Logs";
			displayToggle.style.color = "var(--secondary-button-font-color)";
			let userArr = [];
			Array.prototype.push.apply(userArr, user.futureLogs);

			let parentArr = [];
			let filteredArr = [];
			for (let i = 0; i < currentState.futureLogs.length; i++) {
				Array.prototype.push.apply(parentArr, userArr.filter((object) => object.id === currentState.futureLogs[i]));
			}

			// Filter with the contents of the search bar
			Array.prototype.push.apply(filteredArr, parentArr.filter((element) => element.title.includes(search)));
			console.log(filteredArr);

			let dropdownContainer = document.createElement("section");
			dropdownContainer.id = "dropdownContainer";
			contentWrapper.appendChild(dropdownContainer);
			console.log(currentState.futureLogs);
			let dropdowns = [];
			for (let i = 0; i < filteredArr.length; i++) {
				console.log("inside for loop");
				if (filteredArr[i].objectType === "futureLog") {
					let dropdown = new IndexDropdown(filteredArr[i]);
					if (i === 0) {
						dropdown.toggleItems();
					}
					dropdownContainer.appendChild(dropdown)
					dropdowns.push(dropdown);
				}
			}
			contentWrapper.appendChild(displayToggle);
			let dropdownContent = [
				{
					title: "Future Logs",
					icon: "../public/resources/futureLog.png",
					listener: ()=>{
						displayToggle.innerHTML = "&#x25BC;   Future Logs"
						if (user.index.futureLogs.length === 0) {
							creationMenu.setKind("futureLog");
							creationMenu.show();
						}
						if (user.index.futureLogs.length !== 0) {
							if (dropdowns.length !== 0) {
								for (let i = 0; i < dropdowns.length; i++) {
									dropdownContainer.removeChild(dropdowns[i]);
								}
							}
							dropdowns = [];
							let futArr = [];
							for (let i = 0; i < user.index.futureLogs.length; i++) {
								Array.prototype.push.apply(futArr, user.futureLogs.filter((object) => object.id === user.index.futureLogs[i]));
							}
							for (let i = 0; i < futArr.length; i++) {
								console.log("inside for loop");
								if (futArr[i].objectType === "futureLog") {
									let dropdown = new IndexDropdown(futArr[i]);
									if (i === 0) {
										dropdown.toggleItems();
									}
									dropdownContainer.appendChild(dropdown)
									dropdowns.push(dropdown);
								}
							}
						}
						adderDropdown.hide();
					}
				}, {
					title: "Collections",
					icon: "../public/resources/todaysLog.png",
					listener: ()=>{
						displayToggle.innerHTML = "&#9650;   Collections"
						if (user.index.collections.length === 0) {
							creationMenu.setKind("collection");
							creationMenu.show();
						}
						if (user.index.collections.length !== 0) {
							if (dropdowns.length !== 0) {
								for (let i = 0; i < dropdowns.length; i++) {
									dropdownContainer.removeChild(dropdowns[i]);
								}
							}
							dropdowns = [];
							let collArr = user.index.collections;
							for (let i = 0; i < user.index.collections.length; i++) {
								Array.prototype.push.apply(collArr, user.collections.filter((object) => object.id === user.index.collections[i]));
							}
							for (let i = 0; i < collArr.length; i++) {
								console.log("inside for loop");
								if (collArr[i].objectType === "futureLog") {
									let dropdown = new IndexDropdown(collArr[i]);
									if (i === 0) {
										dropdown.toggleItems();
									}
									dropdownContainer.appendChild(dropdown)
									dropdowns.push(dropdown);
								}
							}
						}
						adderDropdown.hide();
					}
				}
			]
			displayToggle.onclick = ()=>{
				const TopOffset = displayToggle.getBoundingClientRect().bottom + 5 + document.body.scrollTop;
				const LeftOffset = displayToggle.getBoundingClientRect().left;
				adderDropdown.openUtilDropdown(TopOffset, LeftOffset, dropdownContent);
			}

		}
	});
	header.title = "Index";

}


export function refreshIndex () {
	localStorage.readUser((err, user) => {
		if (err) {
			console.log(err);
		} else {
			let oldChild = contentWrapper.lastElementChild;
			while (oldChild) {
				contentWrapper.removeChild(oldChild);
				oldChild = contentWrapper.lastElementChild;
			}

			let displayToggle = document.createElement("button");
			displayToggle.id = "displayToggle";
			displayToggle.innerHTML = "&#x25BC;   Future Logs";
			displayToggle.style.color = "var(--secondary-button-font-color)";
			let userArr = [];
			Array.prototype.push.apply(userArr, user.futureLogs);

			let parentArr = [];
			let filteredArr = [];
			for (let i = 0; i < currentState.futureLogs.length; i++) {
				Array.prototype.push.apply(parentArr, userArr.filter((object) => object.id === currentState.futureLogs[i]));
			}

			// Filter with the contents of the search bar
			Array.prototype.push.apply(filteredArr, parentArr.filter((element) => element.title.includes(search)));
			console.log(filteredArr);

			let dropdownContainer = document.createElement("section");
			dropdownContainer.id = "dropdownContainer";
			contentWrapper.appendChild(dropdownContainer);
			console.log(currentState.futureLogs);
			let dropdowns = [];
			for (let i = 0; i < filteredArr.length; i++) {
				console.log("inside for loop");
				if (filteredArr[i].objectType === "futureLog") {
					let dropdown = new IndexDropdown(filteredArr[i]);
					if (i === 0) {
						dropdown.toggleItems();
					}
					dropdownContainer.appendChild(dropdown)
					dropdowns.push(dropdown);
				}
			}
			contentWrapper.appendChild(displayToggle);
			let dropdownContent = [
				{
					title: "Future Logs",
					icon: "../public/resources/futureLog.png",
					listener: ()=>{
						displayToggle.innerHTML = "&#x25BC;   Future Logs"
						if (user.index.futureLogs.length === 0) {
							creationMenu.setKind("futureLog");
							creationMenu.show();
						}
						if (user.index.futureLogs.length !== 0) {
							if (dropdowns.length !== 0) {
								for (let i = 0; i < dropdowns.length; i++) {
									dropdownContainer.removeChild(dropdowns[i]);
								}
							}
							dropdowns = [];
							let futArr = [];
							for (let i = 0; i < user.index.futureLogs.length; i++) {
								Array.prototype.push.apply(futArr, user.futureLogs.filter((object) => object.id === user.index.futureLogs[i]));
							}
							for (let i = 0; i < futArr.length; i++) {
								console.log("inside for loop");
								if (futArr[i].objectType === "futureLog") {
									let dropdown = new IndexDropdown(futArr[i]);
									if (i === 0) {
										dropdown.toggleItems();
									}
									dropdownContainer.appendChild(dropdown)
									dropdowns.push(dropdown);
								}
							}
						}
						adderDropdown.hide();
					}
				}, {
					title: "Collections",
					icon: "../public/resources/todaysLog.png",
					listener: ()=>{
						displayToggle.innerHTML = "&#9650;   Collections"
						if (user.index.collections.length === 0) {
							creationMenu.setKind("collection");
							creationMenu.show();
						}
						if (user.index.collections.length !== 0) {
							if (dropdowns.length !== 0) {
								for (let i = 0; i < dropdowns.length; i++) {
									dropdownContainer.removeChild(dropdowns[i]);
								}
							}
							dropdowns = [];
							let collArr = user.index.collections;
							for (let i = 0; i < user.index.collections.length; i++) {
								Array.prototype.push.apply(collArr, user.collections.filter((object) => object.id === user.index.collections[i]));
							}
							for (let i = 0; i < collArr.length; i++) {
								console.log("inside for loop");
								if (collArr[i].objectType === "futureLog") {
									let dropdown = new IndexDropdown(collArr[i]);
									if (i === 0) {
										dropdown.toggleItems();
									}
									dropdownContainer.appendChild(dropdown)
									dropdowns.push(dropdown);
								}
							}
						}
						adderDropdown.hide();
					}
				}
			]
			displayToggle.onclick = ()=>{
				const TopOffset = displayToggle.getBoundingClientRect().bottom + 5 + document.body.scrollTop;
				const LeftOffset = displayToggle.getBoundingClientRect().left;
				adderDropdown.openUtilDropdown(TopOffset, LeftOffset, dropdownContent);
			}

		}
	});
	header.title = "Index";

}
