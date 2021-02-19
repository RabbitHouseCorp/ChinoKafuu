const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
require("moment-duration-format")
module.exports = class QueueCommand extends Command {
	constructor(client) {
		super(client, {
			name: "queue",
			category: "music",
			aliases: ["playlist"],
			UserPermission: null,
			ClientPermission: ["EMBED_LINKS"],
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {

		const embed = new MessageEmbed()
			.setDescription(t("commands:play.unavailable"))
			.setColor(this.client.colors.default)
		message.channel.send(embed)


		// if (!this.client.player.has(message.guild.id)) return message.chinoReply("error", t("commands:dj-module.no-playing"))
		// if (this.client.player.get(message.guild.id).queue.length === 0) return message.chinoReply("error", t("commands:dj-module.queue-null"))
		// let number = 1

		// let queue = this.client.player.get(message.guild.id).queue.map(song => `[**${number++}** | ${song.info.title} - ${moment.duration(song.info.length).format("dd:hh:mm:ss")}](${song.info.uri})`).join("\n")
		// const embed = new MessageEmbed()
		// 	.setColor(this.client.colors.default)
		// 	.setDescription(queue)

		// message.channel.send(embed)
	}
}