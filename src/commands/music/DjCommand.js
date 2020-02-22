const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class DJCommand extends Command {
	constructor(client) {
		super(client, {
			name: "dj",
			category: "music",
			aliases: [],
			UserPermission: null,
			ClientPermission: ["EMBED_LINKS"],
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {

		const embed = new MessageEmbed()
			.setColor(this.client.colors.default)
			.setDescription(t("commands:dj"))
			.setThumbnail(this.client.user.displayAvatarURL())
		message.channel.send(embed)
	}
}