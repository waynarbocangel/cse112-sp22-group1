
//importing security functions
let sec = require ('../security/securityFunctions.js');



beforeAll(done => {
    done()
  });

describe('testing securityFunctions', ()=>{
    //variables
    let password = "how are you God?";
    let message = "please help me";
    //testing hash password
    
    test('testing hash password', ()=>{      
        let hashed = sec.passHash(password);
        expect(hashed).toBe(hashed);
    });

    test('testing hash password', ()=>{      
        let hashed = sec.passHash(password);
        expect(hashed).not.toBe(password);
    });
    
    //testing encrypt
    test('testing encrypt', (done)=>{

        let encrypted = sec.encrypt(message, password);
        expect(sec.encrypt(message,password)).not.toBe(encrypted);
        done();
    });

    //test decrypt
    test('testing decrypt', (done)=>{
        let encrypted = sec.encrypt(message, password);
        expect(sec.decrypt(encrypted,password)).toBe(message);
        done();
    });
    
 
});