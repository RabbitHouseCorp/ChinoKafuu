const Command = require("../../structures/command")
const Discord = require("discord.js")
module.exports = class PlayCommand extends Command {
	constructor(client) {
		super(client, {
			name: "play",
			category: "music",
			aliases: ["tocar"],
			UserPermission: null,
			ClientPermission: null,
			OnlyDevs: false
		})
	}
	async run({ message, args, server }, t) {
		const embed = new Discord.MessageEmbed()
			.setDescription(t("commands:play.unavailable"))

		/* if (!message.member.voice.channel) return message.chinoReply("error", t("commands:dj-module.channel-null"))
		if (message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.chinoReply("error", t("commands:dj-module.another-channel"))

		if (!args[0]) return message.chinoReply("error", t("commands:play.args-null"))
		if (this.client.player.has(message.guild.id)) {
			this.client.player.get(message.guild.id).play(args.join(" ")).then(info => {
				message.chinoReply("cd", t("commands:play.addedQueue", { songTitle: info.title }))
			})
		} else {
			let player = await this.client.lavalinkManager.join(message.member.voice.channel.id)
			player.on("playingNow", (song) => {

				message.chinoReply("headphone", t("commands:play.playingNow", { songTitle: song.info.title }))
			})
			player.on("playingEnd", async () => {
				await this.client.lavalinkManager.manager.leave(message.guild.id)
				this.client.lavalinkManager.manager.delete(message.guild.id)
				this.client.player.delete(message.guild.id)
			})

			player.play(args.join(" "))
			this.client.player.set(message.guild.id, player)
		} */
	}
}
