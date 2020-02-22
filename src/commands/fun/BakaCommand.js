const Command = require("../../structures/command")
const NekosLife = require("nekos.life")
const neko = new NekosLife()
const { MessageEmbed } = require("discord.js")
module.exports = class BakaCommand extends Command {
	constructor(client) {
		super(client, {
			name: "baka",
			category: "fun",
			aliases: [],
			UserPermission: null,
			ClientPermission: null,
			OnlyDevs: false
		})
	}
	async run({ message, args, server }, t) {
		let member = message.mentions.users.first() || this.client.users.cache.get(args[0])
		if (!member) return message.chinoReply("error", t("commands:mention-null"))
		let img = await neko.sfw.baka()
		const embed = new MessageEmbed()
			.setColor(this.client.colors.action)
			.setDescription(t("commands:baka.hasBaka", { member: member.toString(), author: message.author.toString() }))
			.setImage(img.url)

		message.channel.send(embed)
	}
}