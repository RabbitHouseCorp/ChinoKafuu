const Command = require('../../structures/command')
const { Util } = require("discord.js")
module.exports = class RestrictRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'restrictrole',
            category: 'mod',
            aliases: ['restringirrole', "restrictemoji", "restringiremoji"],
            UserPermission: ['MANAGE_ROLES'],
            ClientPermission: ['MANAGE_ROLES'],
            OnlyDevs: false

        })
    }

    run({ message, args, server }, t) {
        if (!args[0]) return message.chinoReply("error", t("commands:restrictemoji.no-option"))
        if (!args[1]) return message.chinoReply("error", t("commands:emoji.args-null"))
        if (!args[2]) return message.chinoReply("error", t("commands:roleinfo.args-null"))
        let emoji = Util.parseEmoji(args[1]) || message.guild.emojis.cache.get(args[1])
        if (!emoji) return message.chinoReply("error", t("commands:restrictemoji.args-emoji-null"))
        if (message.guild.emojis.cache.get(emoji.id)) {
            emoji = message.guild.emojis.cache.get(emoji.id)
        }
        let roles = message.guild.roles.cache.get(args[2].replace(/[<@&>]/g, ""))
        if (!roles) return message.chinoReply("error", t("commands:restrictemoji.role-null"))
        let optionsadd = ["adicionar", "add", "insert"]
        let optionsremove = ["remover", "remove", "delete", "deletar"]

        if (optionsadd.includes(args[0].toLowerCase())) {
            message.guild.emojis.cache.get(emoji.id).roles.add(roles.id).then(() => {
                message.channel.send(`${emoji} **|** ${message.author.toString()}, ${t("commands:restrictemoji.successfully-added", { role: roles.name })}`)
            })
            return
        }

        if (optionsremove.includes(args[0].toLowerCase())) {
            message.guild.emojis.cache.get(emoji.id).roles.remove(roles.id).then(() => {
                message.channel.send(`${emoji} **|** ${message.author.toString()}, ${t("commands:restrictemoji.successfully-removed", { role: roles.name })}`)
            })
            return
        }
    }
}