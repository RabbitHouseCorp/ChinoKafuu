const Command = require("../../structures/command")
const NekosLife = require("nekos.life")
const neko = new NekosLife()
const { MessageEmbed } = require("discord.js")
module.exports = class PatCommand extends Command {
	constructor(client) {
		super(client, {
			name: "poke",
			category: "fun",
			aliases: ["tear", "catucar"],
			UserPermission: null,
			ClientPermission: ["EMBED_LINKS"],
			OnlyDevs: false
		})
	}
	async run({ message, args, server }, t) {
		let member = message.mentions.users.first() || this.client.users.cache.get(args[0])
		if (!member) return message.chinoReply("error", t("commands:mention-null"))
		let img = await neko.sfw.poke()
		const embed = new MessageEmbed()
			.setColor(this.client.colors.action)
			.setDescription(t("commands:poke", { author: message.author.toString(), member: member.toString() }))
			.setImage(img.url)

		message.channel.send(embed)
	}
}