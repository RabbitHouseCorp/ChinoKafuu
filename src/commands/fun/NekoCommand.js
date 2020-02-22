const Command = require("../../structures/command")
const NekosLife = require("nekos.life")
const neko = new NekosLife()
const { MessageEmbed } = require("discord.js")
module.exports = class NekoCommand extends Command {
	constructor(client) {
		super(client, {
			name: "neko",
			category: "fun",
			aliases: [],
			UserPermission: null,
			ClientPermission: ["EMBED_LINKS"],
			OnlyDevs: false
		})
	}

	async run({ message, args, server }, t) {
		let img = await neko.sfw.neko()
		const embed = new MessageEmbed()
			.setColor(this.client.colors.action)
			.setDescription("<:neko_chino:568298171684356116>")
			.setImage(img.url)

		message.channel.send(embed)
	}
}