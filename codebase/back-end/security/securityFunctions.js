require("dotenv").config();
const CryptoJS = require("crypto-js");
const mongoose = require("mongoose");
const schema = require(__dirname + "/../schema.js");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

<<<<<<< HEAD
let key = process.env.HASHKEY;

//password hashing
=======
//matching key for hashing and encrypting
let key = process.env.HASHKEY;

/*
 * purpose: hash a string (password): 1 way hashing
 * input: a string as password 
 * output:  a hashed value for password
 */
>>>>>>> front-end_drop
function passHash(password){
    let hashed = CryptoJS.HmacSHA256(password, key);
    hashed = hashed.toString();
    return hashed;
}


<<<<<<< HEAD
// Encrypt
=======
/*
 * encrypt a string : data
 * input: message to encrypt and use password of user to encrypt with
 * output: encrypted string data
 */
>>>>>>> front-end_drop
function encrypt(message, password){
    var encrypted = CryptoJS.AES.encrypt(message, password).toString();
    return encrypted;
}

<<<<<<< HEAD
// Decrypt
=======
/*
 * decrypt a string data
 * input: encryped data and user password to decrypt
 * output: string value of data
 */
>>>>>>> front-end_drop
 function decrypt(data, password){
    var decrypted  = CryptoJS.AES.decrypt(data, password);
    var originalText = decrypted.toString(CryptoJS.enc.Utf8);
    return originalText;
}

<<<<<<< HEAD
=======
/*
 * purpose: check if user and password match
 * input: userObject
 * output: true/false of user info
 */
>>>>>>> front-end_drop
function authenticate(userData, callback){
    schema.User.findOne({email: userData.email}, (error, user) => {
        if (error || user == null){
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