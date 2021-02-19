const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class InviteCommand extends Command {
	constructor(client) {
		super(client, {
			name: "invite",
			category: "misc",
			aliases: ["convite"],
			UserPermission: null,
			ClientPermission: null,
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {

		const embed = new MessageEmbed()
			.setColor(this.client.colors.default)
			.addField(t("commands:invite.MyInvite"), t("commands:invite.invite", { clientID: this.client.user.id }))

		message.author.send(embed).then(() => {
			message.reply(t("commands:send-dm"))
		}).catch(() => {
			message.chinoReply("error", t("commands:closed-dm"))
		})
	}
}