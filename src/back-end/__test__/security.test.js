
let create = require ('../createFiles/createUser.js');
let sec = require ('../security/securityFunctions.js');
//let mon = require('mongoose');
//let schema =require('../schema.js'); 
//import * as sec from "../security/securityFunctions.js";


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
    
    //testing creauteruser
    
    /*
    test("testName", (done) => {
        function handleCallBack(e){
          try{
            console.log(e);
            expect(1).toBe(1);
            done();
          } catch (error) {
            done(error);
          }
        }
        create.createUser("abc", "123", handleCallBack);
      });
      */
    //closing servers
    
    /*
    afterAll(done => {
        // Closing the DB connection allows Jest to exit successfully.
        //sec.mongoose.connection.close();
        //schema.mongoose.connection.close();
        sec.closeall();
        done();
      }); */
      
});