const Command = require("../../structures/command")
module.exports = class ClearCommand extends Command {
	constructor(client) {
		super(client, {
			name: "clear",
			category: "mod",
			aliases: ["limpar", "clean"],
			UserPermission: ["MANAGE_MESSAGES"],
			ClientPermission: ["MANAGE_MESSAGES"],
			OnlyDevs: false
		})
	}
	run({message, args, server }, t) {

		if (!args[0]) return message.chinoReply("error", t("commands:clear.args-null"))
		if (args[0] > 100) return message.chinoReply("error", t("commands:clear.limit"))
		message.channel.bulkDelete(args[0]).then(msg => {
			message.chinoReply("trash", t("commands:clear.success", {totalMsg: msg.size}))
			.then(msg => {
				setTimeout(() => msg.delete(5000), 5000)
})		}).catch(() => {
			message.chinoReply("error", t("commands:clear.error"))		})
	}
}