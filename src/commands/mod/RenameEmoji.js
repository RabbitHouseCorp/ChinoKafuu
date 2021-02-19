const Command = require("../../structures/command")
module.exports = class RenameEmojiCommand extends Command {
    constructor(client) {
        super(client, {
            name: "renameemoji",
            aliases: ["renomearemoji"],
            category: "mod",
            UserPermission: ["MANAGE_EMOJIS"],
            ClientPermission: ["MANAGE_EMOJIS"]
        })
    }

    run({ message, args, server }, t) {
        if (!args[0]) return message.chinoReply("error", t("commands:renameemoji.args-null"))
        let emoji = message.guild.emojis.cache.get(require("discord.js").Util.parseEmoji(args[0]).id)
        if (!emoji) return message.chinoReply("error", t("commands:renameemoji.emoji-not-found"))
        if (!args[1]) return message.chinoReply("error", t("commands:renameemoji.emoji-name-null"))

        emoji.edit({ name: args[1] }).then(emoji => {
            message.channel.send(`${emoji} **|** ${message.author}, ${t("commands:renameemoji.success")}`)
        })
    }
}
