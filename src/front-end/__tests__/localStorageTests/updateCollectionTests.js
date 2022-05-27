import { updateCollection, readUser } from "../../localStorage/userOperations.js";
/* what does this line do? 
what is files.js for again? 
how to know what to import */
// import { updateAudioOne, updateAudioTwo } from "./files.js";
import { db } from "../localStorage.test.js";

export let updateCollectionTests = () => {
    describe("Tests for updating Collections", () => {
        test("Tests update collections in localStorage successful", async (done) => {
            readUser((error, user) => {
                expect(error === null).toBe(true);
                let originalCollection = user.collections[0];
                user.collections[0].parent = user.monthlyLogs[1].id;
                user.collections[0].title = "Now Updated Test Collection";
                updateCollection(user.collections[0], true, async (err) => {
                    expect(err === null).toBe(true);
                    await expect(db.get("0000").then(doc => {
                        expect(doc.monthlyLogs.length).toBe(4);
                        expect(doc.collections.length).toBe(1);
                        expect(doc.collections[0].id).toBe(originalCollection.id);
                        expect(doc.collections[0].parent).toBe(user.monthlyLogs[1].id);
                        expect(doc.collections[0].title).toBe("Now Updated Test Collection");
                        expect(doc.collections[0].content.length).toBe(0);
                        expect(doc.collections[0].collections.length).toBe(0);
                        expect(doc.collections[0].trackers.length).toBe(0);
                        done();
                    })).resolves.toBe(undefined);
                });
            });
        }, 5000);
    });
};