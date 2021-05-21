import { router } from './router.js';
const setState = router.setState;

document.addEventListener('DOMContentLoaded', () => {

});

window.onpopstate = function(event) {
    setState(event.state, true);
}

document.querySelector("page-header button").addEventListener("click", () => {
    setState({name: "daily_log"}, false);
    console.log("hello");
});

document.querySelector("title_page").addEventListener("click", () => {
    setState({name: "monthly_log"}, false);
});