import { updateAudioBlock, readUser } from "../../localStorage/userOperations.js";
import { updateAudioOne } from "./files.js";
import { db } from "../localStorage.test.js";

export let updateAudioBlockTests = () => {
	describe(" Tests for updating Audio Blocks", () => {
		test("Tests update Audio Blocks in localStorage", async (done) => {
			readUser((error, user) => {
				expect(error === null).toBe(true);
				let originalBlock = user.audioBlocks[0];
				let originalBlockID = originalBlock.id;
				let originalParent = (user.monthlyLogs.filter(log => log.id === originalBlock.parent))[0];
				let originalParentID = originalParent.id;
				user.audioBlocks[0].data = updateAudioOne;
				user.audioBlocks[0].parent = user.monthlyLogs[0].id;
				let newParentID = user.monthlyLogs[0].id;
				updateAudioBlock(user.audioBlocks[0], originalParent, false, async (err) => {
					expect(err === null).toBe(true);
					await expect(db.get("0000").then(doc => {
						expect(doc.monthlyLogs.length).toBe(4);
						expect(doc.audioBlocks.length).toBe(1);
						expect(doc.audioBlocks[0].id).toBe(originalBlockID);
						expect(doc.audioBlocks[0].parent).toBe(newParentID);
						expect(doc.audioBlocks[0].parent !== originalParentID).toBe(true);
						expect((doc.monthlyLogs.filter(log => log.id === originalParentID))[0].content.filter(block => block.id === originalBlockID).length).toBe(0);
						expect(((doc.monthlyLogs.filter(log => log.id === newParentID))[0].content.filter(block => block.id === originalBlockID))[0]).toBe(originalBlockID);
						expect(doc.audioBlocks[0].arrangement).toBe("center");
						expect(doc.audioBlocks[0].data).toBe(updateAudioOne);
						done();
					})).resolves.toBe(undefined);
				});
			});
		}, 5000);

		test("Tests update Audio Blocks in localStorage with update successful", async (done) => {
			readUser((error, user) => {
				expect(error === null).toBe(true);
				let originalBlock = user.audioBlocks[0];
				let originalBlockID = originalBlock.id;
				let originalParent = (user.monthlyLogs.filter(log => log.id === originalBlock.parent))[0];
				let originalParentID = originalParent.id;
				user.audioBlocks[0].data = updateAudioOne;
				user.audioBlocks[0].parent = user.monthlyLogs[0].id;
				let newParentID = user.monthlyLogs[0].id;
				updateAudioBlock(user.audioBlocks[0], originalParent, true, async (err) => {
					expect(err === null).toBe(true);
					await expect(db.get("0000").then(doc => {
						expect(doc.monthlyLogs.length).toBe(4);
						expect(doc.audioBlocks.length).toBe(1);
						expect(doc.audioBlocks[0].id).toBe(originalBlockID);
						expect(doc.audioBlocks[0].parent).toBe(newParentID);
						expect(doc.audioBlocks[0].parent !== originalParentID).toBe(true);
						expect((doc.monthlyLogs.filter(log => log.id === originalParentID))[0].content.filter(block => block.id === originalBlockID).length).toBe(0);
						expect(((doc.monthlyLogs.filter(log => log.id === newParentID))[0].content.filter(block => block.id === originalBlockID))[0]).toBe(originalBlockID);
						expect(doc.audioBlocks[0].arrangement).toBe("center");
						expect(doc.audioBlocks[0].data).toBe(updateAudioOne);
						done();
					})).resolves.toBe(undefined);
				});
			});
		}, 5000);
	});
};