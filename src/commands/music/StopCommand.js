const Command = require("../../structures/command")
module.exports = class StopCommand extends Command {
	constructor(client) {
		super(client, {
			name: "stop",
			category: "music",
			aliases: ["parar"],
			UserPermission: null,
			ClientPermission: null,
			OnlyDevs: false
		})
	}
	async run({ message, args, server }, t) {

		if (!this.client.player.has(message.guild.id)) return message.chinoReply("error", t("commands:dj-module.queue-null"))
		if (!message.member.voice.channel) return message.chinoReply("error", t("commands:dj-module.channel-null"))
		if (message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.chinoReply("error", t("commands:dj-module.another-channel"))

		this.client.player.get(message.guild.id).player.stop()
		await this.client.lavalinkManager.manager.leave(message.guild.id)
		this.client.lavalinkManager.manager.delete(message.guild.id)
		this.client.player.delete(message.guild.id)

		message.chinoReply("success", t("commands:stop"))
	}
}