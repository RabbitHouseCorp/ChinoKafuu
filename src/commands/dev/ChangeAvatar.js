const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class ChangeAvatarCommand extends Command {
	constructor(client) {
		super(client, {
			name: "changeavatar",
			category: "developers",
			aliases: ["alteraravatar", "setavatar"],
			UserPermission: null,
			ClientPermission: ["EMBED_LINKS"],
			OnlyDevs: true
		})
	}
	run({ message, args, server }, t) {

		let avatar = args[0]
		if (message.attachments.first()) {
			avatar = message.attachments.first().url
			this.client.user.setAvatar(avatar).then(bot => {
				const embed = new MessageEmbed()
					.setColor(this.client.colors.default)
					.setAuthor(t("commands:changeavatar.avatar"), bot.displayAvatarURL())
					.setImage(`${bot.displayAvatarURL({ size: 2048 })}`)

				message.channel.send(embed)
			})
		} else {
			if (!avatar) return message.chinoReply("error", t("commands:changeavatar.args-null"))
			this.client.user.setAvatar(avatar).then(bot => {
				const embed = new MessageEmbed()
					.setColor(this.client.colors.default)
					.setAuthor(t("commands:changeavatar.avatar"), bot.displayAvatarURL())
					.setImage(`${bot.displayAvatarURL({ size: 2048 })}`)

				message.channel.send(embed)
			})
		}
	}
}
