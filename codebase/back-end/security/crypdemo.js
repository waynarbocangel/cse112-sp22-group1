let crp = require("./securityFUnctions.js");
let psw = crp.passHash("what is love");
console.log(psw);


let words = crp.encrypt("baby don't hurt me", psw);
console.log(words);

console.log(crp.decrypt(words, psw));
