const { RichEmbed } = require("discord.js")
const Command = require("../../structures/command")
module.exports = class ProfileCommand extends Command {
    constructor (client) {
        super(client, {
            name: "profile",
            aliases: ["perfil"],
            category: "social"
        })
    }

    async run({message, args, server}, t) {
        let member = message.mentions.users.first() || this.client.users.get(args[0]) || message.author
        let user = await this.client.database.Users.findById(member.id)
        if (!user) {
            new this.client.database.Users({
                _id: member.id
            }).save()
        }
        if (args[0] === "color") {
            if (!args[1]) return message.chinoReply("error", t("commands:profile.colors.args-null"))
            if (!args[1].includes("#")) return message.chinoReply("error", t("commands:profile.colors.hex"))

            user.profileColor = args[1]
            user.save()
        }
        let description = [
            `${this.client.emotes.sharo_excited} **${t("commands:profile.aboutme")} »** *\`${user.aboutme}\`*`,
            `${this.client.emotes.rize_smile} **${t("commands:profile.user-name")} »** *\`${member.tag}\`*`,
            `${this.client.emotes.chino_peek} **${t("commands:profile.user-id")} »** *\`${member.id}\`*`,
            `${this.client.emotes.cocoa_carresing_tippy} **${t("commands:profile.marred")} »** *\`${user.isMarry ? this.client.users.get(user.marryWith).tag : t("commands:with-nobody")}\`*`,
            `${this.client.emotes.yen} **${t("commands:profile.yens")} »** *\`${Number(user.yens).toLocaleString()}\`*`,
            `${this.client.emotes.sharo_hug_chino} **${t("commands:profile.rep")} »** *\`${user.rep}\`*`
        ]
        const embed = new RichEmbed()
        .setColor(user.profileColor)
        .setAuthor(t("commands:profile.title", {member: member.tag}), member.displayAvatarURL)
        .setThumbnail(member.displayAvatarURL)
        .setDescription(description.join("\n\n"))

        message.channel.send(embed)
    }
}