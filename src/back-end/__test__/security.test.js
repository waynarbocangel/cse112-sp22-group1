
// Importing security functions
let sec = require("../security/securityFunctions.js");


beforeAll((done) => {
    done()
  });

describe("testing securityFunctions", ()=>{
    // Variables
    let password = "how are you God?";
    let message = "please help me";
    // Testing hash password

    test("testing hash password", ()=>{
        let hashed = sec.passHash(password);
        expect(hashed).toBe(hashed);
    });

    test("testing hash password", ()=>{
        let hashed = sec.passHash(password);
        expect(hashed).not.toBe(password);
    });

    // Testing encrypt
    test("testing encrypt", (done)=>{

        let encrypted = sec.encrypt(message, password);
        expect(sec.encrypt(message, password)).not.toBe(encrypted);
        done();
    });

    // Test decrypt
    test("testing decrypt", (done)=>{
        let encrypted = sec.encrypt(message, password);
        expect(sec.decrypt(encrypted, password)).toBe(message);
        done();
    });


});
