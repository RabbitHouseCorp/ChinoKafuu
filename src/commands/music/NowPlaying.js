const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
require("moment-duration-format")
module.exports = class NowPlayingCommand extends Command {
	constructor(client) {
		super(client, {
			name: "nowplaying",
			category: "music",
			aliases: ["playingnow", "np"],
			UserPermission: null,
			ClientPermission: ["EMBED_LINKS"],
			OnlyDevs: false
		})
	}

	async run({ message, args, server }, t) {

		const embed = new MessageEmbed()
			.setDescription(t("commands:play.unavailable"))
			.setColor(this.client.colors.default)
		message.channel.send(embed)

		// if (!this.client.player.has(message.guild.id)) return message.chinoReply("error", t("commands:dj-module.queue-null"))
		// if (!this.client.player.get(message.guild.id).nowPlaying) return message.chinoReply("error", t("commands:dj-module.queue-null"))
		// if (!message.member.voice.channel) return message.chinoReply("error", t("commands:dj-module.channel-null"))
		// if (message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.chinoReply("error", t("commands:dj-module.another-channel"))

		// message.channel.send(t("commands:np.waiting")).then(msg => {
		// 	let start = this.client.player.get(message.guild.id).player.state.position >= 3600000 ? moment.duration(this.client.player.get(message.guild.id).player.state.position).format("hh:mm:ss", { stopTrim: "h" }) : moment.duration(this.client.player.get(message.guild.id).player.state.position).format("mm:ss", { stopTrim: "m" })
		// 	let end = moment.duration(this.client.player.get(message.guild.id).nowPlaying.length).format("hh:mm:ss")
		// 	let volume = `${this.client.player.get(message.guild.id).player.state.volume}/150`
		// 	let player = this.client.player.get(message.guild.id).nowPlaying
		// 	const embed = new MessageEmbed()
		// 		.setColor(this.client.colors.default)
		// 		.setURL(player.uri)
		// 		.setTitle(t("commands:np.nowplaying"))
		// 		.addField(t("commands:np.name"), player.title)
		// 		.addField(t("commands:np.time"), `${start}/${end}`)
		// 		.addField(t("commands:np.volume"), volume)
		// 		.addField(t("commands:np.url"), player.uri)

		// 	msg.edit(embed)
		// })
	}
}