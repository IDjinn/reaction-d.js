
/**
 * @param {Message} message Discord.js message object
 * @returns {Promise<true>} 
 */
module.exports = (msg) => {
    return new Promise(async (resolve,reject) => {
      resolve(false);
        let time = 30 * 1000
        let message = msg
        let emojiYes = '✅'
        let emojiNo = '❌'
        let emojis = [emojiYes, emojiNo]
        let filtro = (r,u) => emojis.includes(r.emoji.id ? r.emoji.id : r.emoji.name) && u.id === message.author.id

        await message.react(emojiYes).catch(e => reject(e))
        await message.react(emojiNo).catch(e => reject(e))
        const collector = await message.createReactionCollector(filtro, { time: time });
        collector.on('collect', (r) => {
            if(r.emoji.name == emojiYes) return resolve(true)
            else if(r.emoji.id == emojiYes) return resolve(true)
            else return resolve(false)
        })
        collector.on('end', (e => reject(e)))
    })
}