import { router } from './router.js';
const setState = router.setState;

document.addEventListener('DOMContentLoaded', () => {

});

window.onpopstate = function(event) {
    setState(event.state, true);
}

document.querySelector("header img").addEventListener("click", () => {
    setState({name: "daily_log"}, false);
});

document.querySelector("title_page").addEventListener("click", () => {
    setState({name: "monthly_log"}, false);
});