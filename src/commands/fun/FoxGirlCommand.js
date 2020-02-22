const Command = require("../../structures/command")
const NekosLife = require("nekos.life")
const neko = new NekosLife()
const { MessageEmbed } = require("discord.js")
module.exports = class FoxGirlCommand extends Command {
	constructor(client) {
		super(client, {
			name: "foxgirl",
			category: "fun",
			aliases: [],
			UserPermission: null,
			ClientPermission: ["EMBED_LINKS"],
			OnlyDevs: false
		})
	}
	async run({ message, args, server }, t) {
		let img = await neko.sfw.foxGirl()
		const embed = new MessageEmbed()
			.setColor(this.client.colors.action)
			.setDescription("<:FoxHey:586743909066211328>")
			.setImage(img.url)

		message.channel.send(embed)
	}
}