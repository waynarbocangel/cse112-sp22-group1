export const router = {};

router.setState = function(state, prev) {
    let url = "";
  
    let body = document.querySelector("body");
    body.className = "";

    let title = document.querySelector("title_page h1");
    console.log(title);

    if(state.name == "index" || state == null) {
        title.innerText = "Index";
    
        url = window.location.origin;
    }
    else if(state.name == "daily_log") {
        title.innerText = "Daily Log";
    
        url = "/#daily_log";
    }
    else if(state.name == "monthly_log") {
        title.innerText = "Monthly Log";

        url = "/#monthly_log";
    }
    else if(state.name == "future_log") {
        title.innerText = "Future Log";
        
        url = "/#future_log";
    }
}