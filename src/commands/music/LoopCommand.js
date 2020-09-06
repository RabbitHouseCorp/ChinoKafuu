const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class LoopCommand extends Command {
	constructor(client) {
		super(client, {
			name: "loop",
			category: "music",
			aliases: ["repeat", "repetir"],
			UserPermission: null,
			ClientPermission: null,
			OnlyDevs: false
		})
	}

	async run({ message, args, server }, t) {

		const embed = new MessageEmbed()
			.setDescription(t("commands:play.unavailable"))
			.setColor(this.client.colors.default)
		message.channel.send(embed)

		// if (!this.client.player.has(message.guild.id)) return message.chinoReply("error", t("commands:dj-module.no-playing"))
		// if (this.client.player.get(message.guild.id).repeat === false) {
		// 	this.client.player.get(message.guild.id).repeat = true
		// 	message.chinoReply("success", t("commands:loop.enable"))
		// } else {
		// 	this.client.player.get(message.guild.id).repeat = false
		// 	message.chinoReply("success", t("commands:loop.disable"))
		// }
	}
}