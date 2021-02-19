const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class VoteCommand extends Command {
	constructor(client) {
		super(client, {
			name: "vote",
			category: "Random",
			aliases: ["votar"],
			UserPermission: null,
			ClientPermission: null,
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {

		let embed = new MessageEmbed()
			.setColor(this.client.colors.default)
			.setDescription(t("commands:vote.voteMsg", { author: message.author.username, prefix: server.prefix }))
			.setFooter(this.client.user.username, this.client.user.avatarURL)
			.setTimestamp(new Date())

		message.author.send(embed)
		message.chinoReply("chino_peek", t("commands:vote.send-dm", { author: message.author }))
	}
}