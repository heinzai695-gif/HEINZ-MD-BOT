const axios = require("axios");
const { cmd } = require("../command");

cmd({
    pattern: "tiktok",
    alias: ["ttdl", "tt", "tiktokdl"],
    desc: "Download TikTok video without watermark",
    category: "downloader",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("Please provide a TikTok video link.");
        if (!q.includes("tiktok.com")) return reply("Invalid TikTok link.");
        
        reply("𝑼𝒑𝒍𝒐𝒂𝒅𝒊𝒏𝒈 𝒚𝒐𝒖𝒓 𝒗𝒊𝒅𝒆𝒐....");
        
        const apiUrl = `https://delirius-apiofc.vercel.app/download/tiktok?url=${q}`;
        const { data } = await axios.get(apiUrl);
        
        if (!data.status || !data.data) return reply("Failed to fetch TikTok video.");
        
        const { title, like, comment, share, author, meta } = data.data;
        const videoUrl = meta.media.find(v => v.type === "video").org;
        
        const caption = `╭ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄──✿
‎*┆*        *『 𝙷𝙴𝙸𝙽𝚉 𝙼𝙳 』*     
‎*┆*👤 *ᴜsᴇʀ:* ${author.nickname} (@${author.username})
‎*┊*❤️ *ʟɪᴋᴇs:* ${like}
‎*┆*💬 *ᴄᴏᴍᴍᴇɴᴛs:* ${comment}
‎*┆*🔁 *sʜᴀʀᴇs:* ${share}
‎*┆*‎ _𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝙷𝙴𝙸𝙽𝚉 𝚃𝙴𝙲𝙷_
‎*╰┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄──✿*`;
        
        await conn.sendMessage(from, {
            video: { url: videoUrl },
            caption: caption,
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: mek });
        
    } catch (e) {
        console.error("Error in TikTok downloader command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});

