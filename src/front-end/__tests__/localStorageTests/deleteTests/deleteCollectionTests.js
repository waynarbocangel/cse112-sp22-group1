import { deleteCollection, readUser } from "../../../localStorage/userOperations.js";
import { db } from "../../localStorage.test.js";

export let deleteCollectionsTests = () => {
    describe("Tests for deleting collections", () => {
        test("tests for deleting collections in local storage", async (done) => {
            readUser(async (error, user) => {
				expect(error == null).toBe(true);
                let id = user.collections[0].id;
				deleteCollection(user.collections[0], user.monthlyLogs[0], true, async (err) => {
                    expect(err == null).toBe(true);
					await expect(db.get("0000").then(doc => {
						expect(doc.collections.filter(collection => collection.id === id).length).toBe(0);
						done();
					})).resolves.toBe(undefined);
                })
            })
        }, 5000)
    })
}
