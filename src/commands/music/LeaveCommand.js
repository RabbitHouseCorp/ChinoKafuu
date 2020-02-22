const Command = require("../../structures/command")
module.exports = class LeaveCommand extends Command {
	constructor(client) {
		super(client, {
			name: "leave",
			category: "music",
			aliases: ["sair"],
			UserPermission: ["BAN_MEMBERS"],
			ClientPermission: null,
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {
		let perm = message.member.roles.find(r => r.name.toLowerCase() === "dj")
		if (!perm && !message.member.hasPermission("BAN_MEMBERS") && !message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(t("permissions:userPermission.dj", { emoji: this.client.emotes.error }))
		if (!message.member.voice.channel) return message.chinoReply("error", t("commands:dj-module.channel-null"))
		if (message.guild.me.voice.channel && message.member.voice.channel != message.guild.me.voice.channel) return message.channel.send(t("commands:dj-module.another-channel"))

		message.reply(t("commands:leave", { voiceChannel: message.member.voice.channel.name })).then(async () => {
			await this.client.lavalinkManager.manager.leave(message.guild.id)
			this.client.lavalinkManager.manager.delete(message.guild.id)
			this.client.player.delete(message.guild.id)
		})
	}
}