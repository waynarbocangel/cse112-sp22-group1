import * as localStorage from "../../localStorage/userOperations.js";
import { createUserPouch } from "../../localStorage/createFiles/createUser.js";
import { user, deleteDB } from "../../localStorage/userOperations.js";
import { db } from "../localStorage.test.js";
import { makeRandomString, compareUsers } from "../testFunctions.js";

export let createUserTests = () => {
	describe ("Tests for local storage create user", () => {
		test('Create User Success', async (done) => {
			let createUserFinished = async (userData) => {
				await expect(compareUsers(userData, user)).toBe(true);
				done();
			};
			localStorage.createUser("testLocalStorage@storage.com", "abcd", createUserFinished);
		});
	});

	describe("Tests for create user Pouch", () => {
		test('Create User Failure', async (done) => {
			let userToCreate = {
				email: "tester@gmail.com",
				theme: "lightmode",
				index: {
					objectType: "index",
					contents: []
				},
				dailyLogs: [],
				monthlyLogs: [],
				futureLogs: [],
				trackers: [],
				collections: [],
				imageBlocks: [],
				audioBlocks: [],
				textBlocks: [],
				events: [],
				tasks: [],
				signifiers: [
					{
						id: makeRandomString(),
						objectType: "signifier",
						meaning: "Updated Signifier",
						symbol: "&#x1F7E0;"
					}
				]
			}
			
			await expect(createUserPouch(db, userToCreate, () => {
				db.get('0000').then((doc) => {
					expect(compareUsers(doc, userToCreate)).toBe(false);
					expect(compareUsers(userToCreate, user)).toBe(false);
					done();
				});
			})).resolves.toBe(undefined);
		});
	});
};