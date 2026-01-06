
const { cmd } = require('../command');
const { runtime } = require('../lib/functions');
const config = require('../config');
const pkg = require('../package.json');

cmd({
    pattern: "uptime",
    alias: ["runtime", "run"],
    desc: "Show bot uptime with stylish formats",
    category: "main",
    react: "✨",
    filename: __filename
},
async (conn, mek, m, { from, reply, args }) => {
    try {
        const uptime = runtime(process.uptime());
        const seconds = Math.floor(process.uptime());
        const startTime = new Date(Date.now() - seconds * 1000);
        const version = pkg.version || "1.0.0";

        const styles = [
`╭──『 *\`𝙷𝙴𝙸𝙽𝚉-𝙼𝙳-𝙱𝙾𝚃\`* 』
│ ⏱️ ${uptime}
│ 🧭 ${seconds} seconds
│ 🚀 Started: ${startTime.toLocaleString()}
╰──────────────⭑─➤
> *𝙼𝙰𝙳𝙴 𝙸𝙽 𝙱𝚈 𝙷𝙴𝙸𝙽𝚉 𝚃𝙴𝙲𝙷*`,

`╭─ 「 *\`𝙷𝙴𝙸𝙽𝚉-𝙼𝙳-𝙱𝙾𝚃\`* 」
│♢ ʀᴜɴɴɪɴɢ: ${uptime}
│♢ sᴇᴄᴏɴᴅs: ${seconds}
│♢ sɪɴᴄᴇ: ${startTime.toLocaleDateString()}
╰──────────────⭑─➤
> *𝙼𝙰𝙳𝙴 𝙸𝙽 𝙱𝚈 𝙷𝙴𝙸𝙽𝚉 𝚃𝙴𝙲𝙷*`,

`╭─ 「 *\`𝙷𝙴𝙸𝙽𝚉-𝙼𝙳-𝙱𝙾𝚃\`* 」
│ • ᴛɪᴍᴇ: ${uptime}
│ • sᴇᴄᴏɴᴅs: ${seconds}
│ • sᴛᴀʀᴛᴇᴅ: ${startTime.toLocaleString()}
╰━━━━━━━━━━━━━━⭑━➤
> *𝙼𝙰𝙳𝙴 𝙸𝙽 𝙱𝚈 𝙷𝙴𝙸𝙽𝚉 𝚃𝙴𝙲𝙷*`,

`╭─ 「 *\`𝙷𝙴𝙸𝙽𝚉-𝙼𝙳-𝙱𝙾𝚃\`* 」
│ ⏳ ${uptime}
│ 🕰️ ${startTime.toLocaleString()}
│ 🔢 ${seconds} sᴇᴄᴏɴᴅs
╰──────────────⭑─➤
> *𝙼𝙰𝙳𝙴 𝙸𝙽 𝙱𝚈 𝙷𝙴𝙸𝙽𝚉 𝚃𝙴𝙲𝙷*`,

`
╭─ 「 *\`𝙷𝙴𝙸𝙽𝚉-𝙼𝙳-𝙱𝙾𝚃\`* 」
│  ʀᴜɴᴛɪᴍᴇ: ${uptime}
│  sᴇᴄᴏɴᴅs:: ${seconds}
│  sɪɴᴄᴇʀᴇʟʏ: ${startTime.toLocaleString()}
╰━━━━━━━━━━━━━━⭑━➤
> *𝙼𝙰𝙳𝙴 𝙸𝙽 𝙱𝚈 𝙷𝙴𝙸𝙽𝚉 𝚃𝙴𝙲𝙷*`,

`> ╭━ 「 *\`𝙷𝙴𝙸𝙽𝚉-𝙼𝙳-𝙱𝙾𝚃\`* 」
> ┃🟢 ᴏɴʟɪɴᴇ ғᴏʀ: ${uptime}
> ┃🔢 sᴇᴄᴏɴᴅs: ${seconds}
> ┃📅 sɪɴᴄᴇ: ${startTime.toLocaleString()}
> ╰━━━━━━━━━━━━━━⭑━➤
> *𝙼𝙰𝙳𝙴 𝙸𝙽 𝙱𝚈 𝙷𝙴𝙸𝙽𝚉 𝚃𝙴𝙲𝙷*`,

`╭─ 「 *\`𝙷𝙴𝙸𝙽𝚉-𝙼𝙳-𝙱𝙾𝚃\`* 」
│◈ ᴅᴜʀᴀᴛɪᴏɴ: ${uptime}
│◈ sᴇᴄᴏɴᴅs: ${seconds}
│◈ sᴛᴀʀᴛ ᴛɪᴍᴇs: ${startTime.toLocaleString()}
│◈ sᴛᴀʙɪʟɪᴛʏ: 100%
╰────────────────❂
> *𝙼𝙰𝙳𝙴 𝙸𝙽 𝙱𝚈 𝙷𝙴𝙸𝙽𝚉 𝚃𝙴𝙲𝙷*`
        ];

        let selectedStyle;
        if (args[0] && args[0].toLowerCase().startsWith("style")) {
            const index = parseInt(args[0].replace("style", "")) - 1;
            if (!isNaN(index) && styles[index]) {
                selectedStyle = styles[index];
            } else {
                return reply(`❌ Style not found.\n✅ Use: style1 to style${styles.length}`);
            }
        } else {
            selectedStyle = styles[Math.floor(Math.random() * styles.length)];
        }

        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/yrbt8y.jpg' },
            caption: selectedStyle,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363406673419120@newsletter',
                    newsletterName: '𝙷𝙴𝙸𝙽𝚉-𝙼𝙳-𝙱𝙾𝚃',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Uptime Error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
