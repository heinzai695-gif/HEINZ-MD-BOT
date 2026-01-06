const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "owner",
    react: "✅", 
    desc: "Get owner number",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from, pushName }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER;
        const ownerName = config.OWNER_NAME;

        const vcard = 'BEGIN:VCARD\n' +
                      'VERSION:3.0\n' +
                      `FN:${ownerName}\n` +  
                      `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}\n` + 
                      'END:VCARD';

        await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        });

        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/yrbt8y.jpgg' },
            caption: `*╭ׂ┄─ׅ─ׂ┄─ׂ┄─ׂ┄─ׂ┄─ׅ─ׂ┄─────❍*
*│  ̇    『 𝙷𝙴𝙸𝙽𝚉 𝙼𝙳 』̣*
*│❀ ωєℓϲοмє ιτѕ нєιηz ᴍᴅ*
*│● ϲяєατοя : нєιηz тє¢н*
*│● иυмϐєя : 56945031186*
*│● ωнατѕαρρ ϐοτ ∂єνєℓορєя*
*╰ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄──❍*`,
            contextInfo: {
                mentionedJid: [`${ownerNumber.replace('+', '')}@s.whatsapp.net`], 
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363406673419120@newsletter',
                    newsletterName: '𝙷𝙴𝙸𝙽𝚉-𝙼𝙳-𝙱𝙾𝚃',
                    serverMessageId: 143
                }            
            }
        }, { quoted: mek });

        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/k0em5t.mp3' },
            mimetype: 'audio/mpeg',
            ptt: true
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});
