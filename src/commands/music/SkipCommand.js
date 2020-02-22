const Command = require("../../structures/command")
module.exports = class SkipCommand extends Command {
	constructor(client) {
		super(client, {
			name: "skip",
			category: "music",
			aliases: ["pular"],
			UserPermission: null,
			ClientPermission: null,
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {

		if (!this.client.player.has(message.guild.id)) return message.channel.send(t("commands:dj-module.no-playing"))
		if (this.client.player.get(message.guild.id).queue.length === 0) return message.chinoReply("error", t("commands:dj-module.queue-null"))
		if (!message.member.voice.channel) return message.chinoReply("error", t("commands:dj-module.channel-null"))
		if (message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.chinoReply("error", t("commands:dj-module.another-channel"))

		message.chinoReply("success", t("commands:skip"))
		this.client.player.get(message.guild.id).skip()
	}
}