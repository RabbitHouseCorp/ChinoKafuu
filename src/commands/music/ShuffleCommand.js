const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class ShuffleCommand extends Command {
	constructor(client) {
		super(client, {
			name: "shuffle",
			aliases: ["embaralhar", "aleatorio"]
		})
	}

	run({ message, args, server }, t) {

		const embed = new MessageEmbed()
			.setDescription(t("commands:play.unavailable"))
			.setColor(this.client.colors.default)
		message.channel.send(embed)

		// if (!this.client.player.has(message.guild.id)) return message.chinoReply("error", t("commands:dj-module.queue-null"))
		// if (this.client.player.get(message.guild.id).queue.length === 0) return message.chinoReply("error", t("commands:dj-module.queue-null"))

		// this.client.player.get(message.guild.id).shuffle()
		// message.chinoReply("success", t("commands:shuffle"))
	}
}