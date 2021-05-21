//import  {createUser} from "./userOperations.js";
//import {readUserPouch} from "./readFiles/readUser.js"
import * as localStorage from "./userOperations.js";


let userObject = {
        email: 'abc',
		pwd: '123',
		dailyLogs: ["test"],
		monthlyLogs: [],
		futureLogs: [],
		collections: [],
		trackers: [],
		textBlocks: [],
		taskBlocks: [],
		eventBlocks: [],
		signifiers: [],
}


//let db = new PouchDB("users");
// createUser("abc", '123', (response)=>{
//     console.log(response);
// });