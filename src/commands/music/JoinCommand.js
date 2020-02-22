const Command = require("../../structures/command")
module.exports = class JoinCommand extends Command {
	constructor(client) {
		super(client, {
			name: "join",
			category: "music",
			aliases: ["entrar"],
			UserPermission: null,
			ClientPermission: ["SPEAK", "CONNECT"],
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {

		if (!message.member.voice.channel) return message.chinoReply("error", t("commands:dj-module.channel-null"))
		if (message.guild.me.voice.channel && message.member.voice.channel != message.guild.me.voice.channel) return message.chinoReply("error", t("commands:dj-module.another-channel"))

		message.reply(t("commands:join", { voiceChannel: message.member.voice.channel.name })).then(async () => await this.client.lavalinkManager.join(message.member.voice.channel.id))
	}
}