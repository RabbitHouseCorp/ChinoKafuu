const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class ResumeCommand extends Command {
	constructor(client) {
		super(client, {
			name: "resume",
			category: "music",
			aliases: ["continuar", "retormar", "unpause"],
			UserPermission: null,
			ClientPermission: null,
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {

		const embed = new MessageEmbed()
			.setDescription(t("commands:play.unavailable"))
			.setColor(this.client.colors.default)
		message.channel.send(embed)

		// if (!this.client.player.has(message.guild.id)) return message.channel.send(t("commands:dj-module.no-playing"))
		// if (this.client.player.get(message.guild.id).player.paused == false) return message.chinoReply("error", t("commands:resume.isPlaying"))
		// if (!this.client.player.get(message.guild.id).player.playing) return message.chinoReply("error", t("commands:resume.queue-null"))
		// if (!message.member.voice.channel) return message.chinoReply("error", t("commands:dj-module.channel-null"))
		// if (message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.chinoReply("error", t("commands:dj-module.another-channel"))

		// message.chinoReply("success", t("commands:resume.playing")).then(this.client.player.get(message.guild.id).player.resume())
	}
}