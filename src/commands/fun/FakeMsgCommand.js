const Command = require("../../structures/command")
module.exports = class FakeMsgCommand extends Command {
	constructor(client) {
		super(client, {
			name: "fakemsg",
			category: "fun",
			aliases: [],
			UserPermission: null,
			ClientPermission: ["MANAGE_WEBHOOK"],
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {
		let member = message.mentions.users.first() || this.client.users.cache.get(args[0])
		if (!member) return message.chinoReply("error", t("commands:mention-null"))
		let botmsg = args.slice(1).join(" ")
		if (!botmsg) return message.chinoReply("error", t("commands:fakemsg"))
		message.channel.createWebhook(member.username, { avatar: member.displayAvatarURL() }).then(webhook => {
			if (message.member.hasPermission("MENTION_EVERYONE")) {
				webhook.send(botmsg, {
					disableEveryone: false
				})
				setTimeout(() => webhook.delete(), 5000)
			} else {
				webhook.send(botmsg, {
					disableEveryone: true
				})
				setTimeout(() => webhook.delete(), 5000)
			}
		})
	}
}
