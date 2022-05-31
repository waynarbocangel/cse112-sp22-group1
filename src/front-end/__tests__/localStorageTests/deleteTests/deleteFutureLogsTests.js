import { deleteFutureLog, readUser } from "../../../localStorage/userOperations.js";
import { db } from "../../localStorage.test.js";

export let deleteFutureLogTests = () => {
    describe("Tests for deleting FutureLog", () => {
        test("tests for deleting FutureLog in local storage", async (done) => {
            readUser(async (error, user) => {
				expect(error == null).toBe(true);
                let id = user.FutureLog[0].id;
				deleteFutureLog(user.FutureLog[0], true, async (err) => {
                    expect(err == null).toBe(true);
					await expect(db.get("0000").then(doc => {
						expect(doc.FutureLog.filter(FutureLog => FutureLog.id === id).length).toBe(0);
						done();
					})).resolves.toBe(undefined);
                })
            })
        }, 5000)
    })
}

