import { updateDailyLog, readUser } from "../../localStorage/userOperations.js";
import { db } from "../localStorage.test.js";

export let updateDailyLogTests = () => {
    describe("Tests for updating dailyLogs", () => {
        test("Tests update dailyLogs in localStorage successful", async (done) => {
            readUser((error, user) => {
                expect(error === null).toBe(true);
                let originalDailyLog = user.dailyLogs[0];
                user.dailyLogs[0].parent = user.monthlyLogs[1].id;
                updateCollection(user.collections[0], true, async (err) => {
                    expect(err === null).toBe(true);
                    await expect(db.get("0000").then(doc => {
                        expect(doc.dailyLogs).toBe(4);
                        expect(doc.dailyLogs.length).toBe(1);
                        expect(doc.dailyLogs[0].id).toBe(originalDailyLog.id);
                        expect(doc.dailyLogs[0].parent).toBe(user.monthlyLogs[1].id);
                        for(let i = 0; i < doc.dailyLogs.content; i++){
                            expect(doc.dailyLogs.content[i]).toBe(originalDailyLog.content[i]);
                        }
                        for(let i = 0; i < doc.dailyLogs.collections; i++){
                            expect(doc.dailyLogs.collections[i]).toBe(originalDailyLog.collections[i]);
                        }
                        for(let i = 0; i < doc.dailyLogs.trackers; i++){
                            expect(doc.dailyLogs.trackers[i]).toBe(originalDailyLog.trackers[i]);
                        }

                        done();
                    })).resolves.toBe(undefined);
                });
            });
        }, 5000);
    });
};