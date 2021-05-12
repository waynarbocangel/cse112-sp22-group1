/*
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
 */
 
var CryptoJS = require("crypto-js");

let key = "group11";
let pw = "Visual Studio Code";

//password hashing
function passHash(password){
    let hashed = CryptoJS.HmacSHA256(password, key);
    hashed= hashed.toString();
    return hashed;
};


//encrypted messages
let message = "liu is the best oh em gee"
// Encrypt
function encrypt(message){
    var encrypted = CryptoJS.AES.encrypt(message, key).toString();
    return encrypted;
};
// Decrypt
 function decrypt(data){
    var decrypted  = CryptoJS.AES.decrypt(data, key);
    var originalText = decrypted.toString(CryptoJS.enc.Utf8);
    return originalText;
};


//for exporting
module.exports = {
    passHash: passHash,
    encrypt: encrypt,
    decrypt: decrypt
}
