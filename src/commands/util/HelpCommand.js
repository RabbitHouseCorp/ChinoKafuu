const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class HelpCommand extends Command {
	constructor(client) {
		super(client, {
			name: "help",
			category: "util",
			aliases: ["ajuda"],
			UserPermission: null,
			clientPermission: null,
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {

		const embed = new MessageEmbed()
		embed.setColor(this.client.colors.default)
		embed.setThumbnail(this.client.user.displayAvatarURL())
		embed.addField(`${t("commands:help.util")} (${this.getCommmandSize("util")})`, this.getCategory("util", server.prefix))
		embed.addField(`${t("commands:help.moderation")} (${this.getCommmandSize("mod")})`, this.getCategory("mod", server.prefix))
		embed.addField(`${t("commands:help.fun")} (${this.getCommmandSize("fun")})`, this.getCategory("fun", server.prefix))
		embed.addField(`${t("commands:help.image")} (${this.getCommmandSize("image")})`, this.getCategory("image", server.prefix))
		embed.addField(`${t("commands:help.music")} (${this.getCommmandSize("music")})`, this.getCategory("music", server.prefix))
		embed.addField(`${t("commands:help.minecraft")} (${this.getCommmandSize("minecraft")})`, this.getCategory("minecraft", server.prefix))
		embed.addField(`${t("commands:help.misc")} (${this.getCommmandSize("misc")})`, this.getCategory("misc", server.prefix))
		embed.addField(`${t("commands:help.social")} (${this.getCommmandSize("social")})`, this.getCategory("social", server.prefix))
		embed.addBlankField(true)
		embed.addField(t("commands:help.addUrl"), t("commands:help.inUrl"))

		message.author.send(embed).then(() => {
			message.reply(t("commands:send-dm"))
		}).catch(() => {
			message.chinoReply("error", t("commands:closed-dm"))
		})
	}

	getCategory(category, prefix) {
		return this.client.commands.filter(c => c.config.category === category).map(c => `\`${prefix}${c.config.name}\``).join(", ")
	}

	getCommmandSize(category) {
		return this.client.commands.filter(c => c.config.category === category).size
	}
}