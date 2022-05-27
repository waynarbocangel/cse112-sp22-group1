import PouchDB from 'pouchdb';
import { setupStorage, deleteDB } from '../localStorage/userOperations.js';
import { createUserTests } from "./localStorageTests/createUserTest.js";
import { createFutureLogTests } from './localStorageTests/createFutureLogTest.js';
import { createDailyLogTests } from './localStorageTests/createDailyLogTests.js';
import { createCollectionTests } from './localStorageTests/createCollectionTests.js';
import { createTrackerTests } from './localStorageTests/createTrackerTests.js';
import { createSignifierTests } from './localStorageTests/createSignifierTests.js';
import { createImageBlockTests } from './localStorageTests/createImageBlockTests.js';
import { createAudioBlockTests } from './localStorageTests/createAudioBlockTests.js';
import { createTextBlockTests } from './localStorageTests/createTextBlockTests.js';

import { deleteCollectionsTests } from './localStorageTests/deleteCollectionTests.js';
import fetch from "node-fetch";
import fetchCookie from "fetch-cookie";

let jar = new fetchCookie.toughCookie.CookieJar()
global.fetch = fetchCookie(fetch, jar);

PouchDB.plugin(require('pouchdb-adapter-memory'));
export let db = new PouchDB("Users", {adapter: 'memory'});
beforeAll(() => {
	setupStorage(db);
});

describe ("All tests for localStorage", () => {
	
	createUserTests();
	createFutureLogTests();
	createDailyLogTests();
	createCollectionTests();
	createTrackerTests();
	createSignifierTests();
	createImageBlockTests();
	createTextBlockTests();
	createAudioBlockTests();

	deleteCollectionsTests();
	

	afterAll(async () => {
		await deleteDB(true);
		jar.removeAllCookies();
		db = null;
	});
});

