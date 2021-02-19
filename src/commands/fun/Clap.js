const Command = require("../../structures/command")
module.exports = class ClapCommand extends Command {
	constructor(client) {
		super(client, {
			name: "clap",
			category: "fun",
			aliases: ["palmas"],
			UserPermission: null,
			ClientPermission: ["USE_EXTERNAL_EMOJIS"],
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {
		let clap = args.join(" ").split(" ").join("<a:clap:554482751542132736>")
		if (!clap) return message.chinoReply("error", t("commands:clap.args-null"))

		if (message.member.hasPermission("MENTION_EVERYONE")) {
			message.channel.send(clap, {
				disableEveryone: false
			})
		} else {
			message.channel.send(clap, {
				disableEveryone: true
			})
		}
	}
}
