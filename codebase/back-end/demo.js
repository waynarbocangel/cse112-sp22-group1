var cr= require("./cryptotest.js");
console.log(cr.passHash("abc"));
console.log(cr.encrypt("abc"));
console.log(cr.decrypt(cr.encrypt("I like cookies")));