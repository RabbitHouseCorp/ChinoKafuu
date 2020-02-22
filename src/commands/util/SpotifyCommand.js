const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class SpotifyCommand extends Command {
	constructor(client) {
		super(client, {
			name: "spotify",
			category: "util",
			aliases: [],
			UserPermission: null,
			ClientPermission: ["EMBED_LINKS"],
			OnlyDevs: false

		})
	}
	async run({ message, args, server }, t) {

		let member
		if (args[0]) {
			member = await this.client.users.fetch(args[0].replace(/[<@!>]/g, ""))
		} else {
			member = message.author
		}
		let spotify = member.presence.activities
		if (!spotify) return message.chinoReply("error", t("commands:spotify.userNoListen", { member: member.username }))
		let spy = member.presence.activities.find(spotify => spotify.name === "Spotify") || spotify.find(spotify => spotify.type === "LISTENING")
		if (!spy) return message.chinoReply("error", t("commands:spotify.userNoListen", { member: member.username }))
		let spotifyImg = spy.assets.largeImageURL()
		let spotifyUrl = `https://open.spotify.com/track/${spy.syncID}`
		let spotifyName = spy.details
		let spotifyAlbum = spy.assets.largeText
		let spotifyAuthor = spy.state

		let embed = new MessageEmbed()
			.setAuthor(t("commands:spotify.userListening", { member: member.tag }), "https://cdn.discordapp.com/emojis/554334875411415107.png?v=1")
			.setColor(this.client.colors.mine)
			.setThumbnail(spotifyImg)
			.setFooter(spotifyAlbum, spotifyImg)
			.addField(t("commands:spotify.name"), spotifyName)
			.addField(t("commands:spotify.author"), spotifyAuthor)
			.addField(t("commands:spotify.album"), spotifyAlbum)
			.addField(t("commands:spotify.url"), t("commands:spotify.inUrl", { spotifyUrl: spotifyUrl }))

		message.channel.send(embed)
	}
}