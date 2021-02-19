const Command = require("../../structures/command")
module.exports = class SetIconCommand extends Command {
	constructor(client) {
		super(client, {
			name: "seticon",
			category: "mod",
			aliases: ["alteraricone"],
			UserPermission: ["MANAGE_GUILD"],
			ClientPermission: ["MANAGE_GUILD"],
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {
		let icon = args[0]

		if (message.attachments.first()) {
			icon = message.attachments.first().url
			message.guild.setIcon(icon).then(() => {
				message.chinoReply("success", t("commands:seticon.success"))
			})
		} else {
			if (!icon) return message.chinoReply("error", t("commands:seticon.args-null"))
			message.guild.setIcon(icon).then(() => {
				message.chinoReply("success", t("commands:seticon.success"))
			})
		}
	}
}
