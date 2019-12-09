const Command = require("../../structures/command")
const { RichEmbed } = require("discord.js")
module.exports = class DanceCommand extends Command {
	constructor (client) {
		super (client, {
			name: "dance",
			category: "fun",
			aliases: [],
			UserPermission: null,
			ClientPermission: null,
			OnlyDevs: false,
			hidden: false
		})
	}
	async run({message, args, server}, t) {
		let member = message.mentions.users.first() || this.client.users.get(args[0])
		if (!member) return message.chinoReply("error", t("commands:mention-null"))
		let api = this.client.api.dance
		let img = api[Math.floor(Math.random() * api.length)]
		const embed = new RichEmbed()
			.setColor(this.client.colors.action)
			.setImage(img)
			.setDescription(t("commands:dance", {author: message.author.toString(), member: member.toString()}))

		message.channel.send(embed)
	}
}
