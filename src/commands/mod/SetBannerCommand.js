const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")

module.exports = class SetBannerCommand extends Command {
    constructor(client) {
        super(client, {
            name: "setbanner",
            aliases: ["setguildbanner", "setarbanner"],
            category: "mod",
            UserPermission: ["MANAGE_GUILD", "EMBED_LINKS"]
        })
    }

    run({ message, args, server }, t) {

        if (message.guild.premiumTier <= 1 || !message.guild.partnered || !message.guild.verified) return message.chinoReply("error", t("commands:no-premium"))
        let banner

        if (message.attachments.first()) {
            banner = message.attachments.first().url
            message.guild.setBanner(banner).then(() => {
                const embed = new MessageEmbed()
                    .setColor(this.client.colors.default)
                    .setDescription(t("commands:setbanner.success"))
                    .setImage(message.guild.bannerURL({ size: 2048 }))
                
                message.channel.send(embed)
            })
        } else {
            banner = args[0]
            if (!banner) return message.channel.send("error", t("commands:setbanner.args-null"))
            message.guild.setBanner(banner).then(() => {
                const embed = new MessageEmbed()
                    .setColor(this.client.colors.default)
                    .setDescription(t("commands:setbanner.success"))
                    .setImage(message.guild.bannerURL({ size: 2048 }))
                
                message.channel.send(embed)
            })
        }
    }
}