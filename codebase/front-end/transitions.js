export function fade (element, callback) {
    // Initial opacity
    let op = 1;
        let timer = setInterval(() => {
		    let end = false;
            if (op <= 0.1) {
                clearInterval(timer);
                element.style.display = "none";
			    end = true;
            }
            element.style.opacity = op;
            op -= op * 0.1;
		    if (end) {
			    callback();
		    }
        }, 10);
}


export function unfade (element, callback) {
	let end = false;
    // Initial opacity
    let op = 0.1;
    element.style.display = "block";
    let timer = setInterval(() =>{
        if (op >= 1) {
            clearInterval(timer);
			end = true;
        }
        element.style.opacity = op;
        op += op * 0.1;
		if (end) {
			callback();
		}
    }, 10);
}
