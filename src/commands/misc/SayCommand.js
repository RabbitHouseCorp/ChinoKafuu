const Command = require("../../structures/command")
module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: "say",
			category: "misc",
			aliases: ["falar"],
			UserPermission: null,
			ClientPermission: ["MANAGE_WEBHOOK", "MANAGE_CHANNELS", "MANAGE_GUILD"],
			OnlyDevs: false
		})
	}
	async run({ message, args, server }, t) {

		let query = args.join(" ").replaceAll('@', '\@') // We escape the @ so it won't mention anyone.
		if (!query) return message.chinoReply("error", t("commands:say"))
		const disableEveryone = message.member.hasPermission("MENTION_EVERYONE")
		const webhook = await message.channel.createWebhook(message.author.username, { avatar: message.author.displayAvatarURL() })

		if (!disableEveryone) {
			if (!message.member.hasPermission("MANAGE_MESSAGES")) {
				await webhook.send(query, { disableEveryone })
				await webhook.delete()
				return
			}
			return message.channel.send(query, { disableEveryone })
		}

		message.channel.send(query)
	}
}
