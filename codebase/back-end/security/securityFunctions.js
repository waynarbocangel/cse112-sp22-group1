require("dotenv").config();
const CryptoJS = require("crypto-js");
const mongoose = require("mongoose");
const schema = require(__dirname + "/../schema.js");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

let key = process.env.HASHKEY;

//password hashing
function passHash(password){
    let hashed = CryptoJS.HmacSHA256(password, key);
    hashed = hashed.toString();
    return hashed;
}


// Encrypt
function encrypt(message, password){
    var encrypted = CryptoJS.AES.encrypt(message, password).toString();
    return encrypted;
}

// Decrypt
 function decrypt(data, password){
    var decrypted  = CryptoJS.AES.decrypt(data, password);
    var originalText = decrypted.toString(CryptoJS.enc.Utf8);
    return originalText;
}

function authenticate(userData, callback){
    schema.User.findOne({email: userData.email}, (error, user) => {
        if (error){
            callback(false);
        } else {
            let hashedPwd = passHash(userData.pwd);
            callback(user.pwd == hashedPwd);
        }
    })
}

//for exporting
module.exports = {
    passHash: passHash,
    encrypt: encrypt,
    decrypt: decrypt,
    authenticate: authenticate
}