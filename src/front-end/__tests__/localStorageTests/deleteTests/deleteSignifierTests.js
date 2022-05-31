import { deleteSignifier, deleteTextBlockByID, readUser } from "../../../localStorage/userOperations.js";
import { db } from "../../localStorage.test.js";

export let deleteSignifierTests = () => {
    describe("Tests for deleting Signifier", () => {
        test("tests for deleting Signifier in local storage", async (done) => {
            readUser(async (error, user) => {
				expect(error == null).toBe(true);
                let id = user.Signifier[0].id;
				deleteSignifier(user.Signifier[0], true, async (err) => {
                    expect(err == null).toBe(true);
					await expect(db.get("0000").then(doc => {
						expect(doc.Signifier.filter(Signifier => Signifier.id === id).length).toBe(0);
						done();
					})).resolves.toBe(undefined);
                })
            })
        }, 5000)
    })
}
