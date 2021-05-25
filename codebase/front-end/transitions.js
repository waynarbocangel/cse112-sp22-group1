export function fade(element, callback) {
    let op = 1;  // initial opacity
    let timer = setInterval(function () {
		let end = false;
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
			end = true;
        }
        element.style.opacity = op;
        op -= op * 0.1;
		if (end) {
			callback();
		}
    }, 10);
}


export function unfade(element, callback) {
	let end = false;
    let op = 0.1;  // initial opacity
    element.style.display = 'block';
    let timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
			end = true;
        }
        element.style.opacity = op;
        op += op * 0.1;
		if (end){
			callback();
		}
    }, 10);
}