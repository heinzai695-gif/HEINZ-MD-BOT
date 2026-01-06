const config = require('../config')
const { runtime } = require('../lib/functions');
const {cmd , commands} = require('../command')
cmd({
    pattern: "bot",
    alias: "heinz",
    react: "🤖",
    desc: "get owner dec",
    category: "misc",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const uptime = runtime(process.uptime());
    const startTime = new Date(Date.now() - process.uptime() * 1000);
let about = `     『 𝙱𝙾𝚃 𝙾𝙽𝙻𝙸𝙽𝙴 』
╭ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄──❍
│꙳ *ʙᴏᴛ ɴᴀᴍᴇ* → ʜᴇɪɴᴢ ᴍᴅ
│꙳ *sᴛᴀᴛᴜs* → ᴏɴʟɪɴᴇ
│꙳ *ᴀᴜᴛᴏ ʀᴇsᴛᴀʀᴛ* → ᴏɴʟɪɴᴇ
│꙳ *ʙᴏᴛ ʀᴜɴ* → ${uptime}
│꙳ *ᴅᴇᴠɪᴄᴇ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ*
╰ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄──❍
> *𝙼𝙰𝙳𝙴 𝙸𝙽 𝙱𝚈 𝙷𝙴𝙸𝙽𝚉 𝚃𝙴𝙲𝙷*`
await conn.sendMessage(from, {
    image: { url: 'https://files.catbox.moe/tzhsic.jpg' },
    caption: about,
    contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363406673419120@newsletter', // ou ton JID actuel
            newsletterName: '𝙷𝙴𝙸𝙽𝚉-𝙼𝙳-𝙱𝙾𝚃',
            serverMessageId: 143
        }
    }
}, { quoted: mek })

}catch(e){
console.log(e)
reply(`${e}`)
}
})
            
