import * as localStorage from "./localStorage/userOperations.js";
import {router} from "./router.js";
document.querySelector("body").style.display = "none";
router.setState(document.location.hash, false);

export let blockArray = [];

window.onpopstate = () => {
	router.setState(document.location.hash, true);
};

