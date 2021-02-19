const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class VolumeCommand extends Command {
	constructor(client) {
		super(client, {
			name: "volume",
			category: "music",
			aliases: ["vol"],
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

		// if (!this.client.player.has(message.guild.id)) return message.chinoReply("error", t("commands:dj-module.no-playing"))
		// if (!message.member.voice.channel) return message.chinoReply("error", t("commands:dj-module.channel-null"))
		// if (message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.chinoReply("error", t("commands:dj-module.another-channel"))
		// if (parseInt(args[0]) > 150) return message.chinoReply("error", t("commands:volume.maxVolume"))
		// if (parseInt(args[0]) < 5) return message.chinoReply("error", t("commands:volume.minVolume"))
		// if (!args[0]) return message.reply(t("commands:volume.hisVol", { volume: this.client.player.get(message.guild.id).player.state.volume }))
		// this.client.player.get(message.guild.id).player.volume(args[0])
		// message.reply(t("commands:volume.volume", { volume: args[0] }))
	}
}