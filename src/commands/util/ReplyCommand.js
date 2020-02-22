const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: "reply",
            aliases: ["r", "responder", "quote"],
            category: "Util",
            ClientPermission: ["MANAGE_MESSAGES", "MANAGE_WEBHOOK", "EMBED_LINKS"]
        })
    }

    run({ message, args, server }, t) {
        if (!args[0]) return message.chinoReply("error", t("commands:reply.args-null"))
        if (!args[1]) return message.chinoReply("error", t("commands:reply.quote-null"))

        message.channel.messages.fetch(args[0]).then(msg => {
            const embed = new MessageEmbed()
                .setAuthor(`${msg.author.tag} ${t("commands:reply.said")}...`, msg.author.avatar.startsWith("a_") ? msg.author.displayAvatarURL({ format: "gif"}) : msg.author.displayAvatarURL({ format: "webp" }))
                .setDescription(msg.content)
                .setColor("#000000")
                .setFooter(`${t("commands:reply.sent-in")} ${msg.channel.name}`, message.guild.icon.startsWith("a_") ? message.guild.iconURL({ format: "gif" }) : message.guild.iconURL({ format: "webp" }))

            message.delete()
            message.channel.createWebhook(message.author.username, {
                avatar: message.author.displayAvatarURL()
            }).then(webhook => {
                webhook.send(`${msg.author}, ${args.slice(1).join(" ")}`, embed)
                setTimeout(() => webhook.delete(), 500)
            })
        }).catch(() => {
            message.chinoReply("error", t("commands:reply.message-not-found"))
        })
    }
}