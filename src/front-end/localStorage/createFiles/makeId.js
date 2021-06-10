
/**
 * Creates and returns a random id of length 30.
 *
 * @return Returns a randomly generated id of length 30.
 */
export function makeid () {
	let length = 30;
    let result = [];
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
   }
   return result.join("");
}
