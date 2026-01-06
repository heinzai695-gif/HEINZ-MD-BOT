// Credits QADEERXTECH

const { isJidGroup } = require('@whiskeysockets/baileys');
const config = require('../config');

const ppUrls = [
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
];

const GroupEvents = async (conn, update) => {
    try {
        const isGroup = isJidGroup(update.id);
        if (!isGroup) return;

        const metadata = await conn.groupMetadata(update.id);
        const participants = update.participants;
        const desc = metadata.desc || "No Description";
        const groupMembersCount = metadata.participants.length;

        let ppUrl;
        try {
            ppUrl = await conn.profilePictureUrl(update.id, 'image');
        } catch {
            ppUrl = ppUrls[Math.floor(Math.random() * ppUrls.length)];
        }

        for (const num of participants) {
            const userName = num.split("@")[0];
            const timestamp = new Date().toLocaleString();

            if (update.action === "add" && config.WELCOME === "true") {
                const WelcomeText = `*╭ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄──✿*\n` +
`*│    ̣  『 𝚆𝙴𝙻𝙲𝙾𝙼𝙴 』̣*\n` +
`*│❀ нєу* @${userName}\n` +
`*│❀ ɢʀσᴜᴘ* ${metadata.subject}\n` +
`*│❀ ѕтαу ѕαfє αɴᴅ fσllσω*\n` +
`*│❀ тнє ɢʀσυᴘѕ ʀᴜʟєѕ!*\n` +
`*│❀ ᴊσιɴєᴅ ${groupMembersCount}*\n` +
`*│❀ ©𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝙷𝙴𝙸𝙽𝚉 𝚃𝙴𝙲𝙷*\n` +
`*╰ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄──✿*`;

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: WelcomeText,
                    mentions: [num]
                });

            } else if (update.action === "remove" && config.GOODBYE === "true") {
                const GoodbyeText = `*╭ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄──✿*\n` +
`*│      『 𝙶𝙾𝙾𝙳𝙱𝚈𝙴 』*\n` +
`*│❀ ᴜѕєʀ* @${userName}\n` +
`*│❀ мємвєʀѕ ιѕ ℓєfт тнє gʀσᴜᴘ*\n` +
`*│❀ мємвєʀs ${groupMembersCount}*\n` +
`*│❀ ©𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝙷𝙴𝙸𝙽𝚉 𝚃𝙴𝙲𝙷*\n` +
`*╰ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄──✿*`;

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: GoodbyeText,
                    mentions: [num]
                });

            } else if (update.action === "demote" && config.ADMIN_ACTION === "true") {
                const demoter = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `*╭──⬡ αᴄтισɴ-ѕтαтᴜs ⬡* \n` +
`*├▢ @${demoter} нαѕ ᴅємσтєᴅ*\n` +
`*├▢ @${userName} fʀσм αᴅмιɴ*\n` +
`*├▢ тιмє : ${timestamp}*\n` +
`*├▢ ɢʀσᴜᴘ :* ${metadata.subject}\n` +
`*╰ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄──✿*`,
                    mentions: [update.author, num]
                });

            } else if (update.action === "promote" && config.ADMIN_ACTION === "true") {
                const promoter = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `*╭────⬡ αᴄтισɴ-ѕтαтᴜs ⬡* \n` +
`*├▢ @${promoter} нαѕ ᴘʀσмσтєᴅ*\n` +
`*├▢ @${userName} тσ αᴅмιɴ*\n` +
`*├▢ тιмє : ${timestamp}*\n` +
`*├▢ ɢʀσᴜᴘ : ${metadata.subject}*\n` +
`*╰ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄──✿*`,
                    mentions: [update.author, num]
                });
            }
        }
    } catch (err) {
        console.error('Group event error:', err);
    }
};

module.exports = GroupEvents;
