const cryp = require("./cryptotest.js");
//import { passHash } from './cryptotest.js';
//const crtp = passHash(import.meta.url);

//console.log(cryp.passHash("hello"));
//console.log(cryp.encrypt("liu is the best"));
console.log(cryp.decrypt(cryp.encrypt("liu is the best")));