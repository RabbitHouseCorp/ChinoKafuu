const Command = require("../../structures/command")
module.exports = class BlackListCommand extends Command {
	constructor(client) {
		super(client, {
			name: "blacklist",
			category: "developers",
			aliases: ["listanegra"],
			UserPermission: null,
			ClientPermission: null,
			OnlyDevs: true,
			hidden: true,
		})
	}
	async run({ message, args, server }, t) {
		let user = await this.client.database.Users.findById(args[1])

		switch (args[0]) {
			case "add":
				if (!user || user === null) return message.chinoReply("error", t('commands:blacklist.userNotFound'))

				user.blacklist = true
				user.blacklistReason = args.slice(2).join(" ")
				user.save()

				message.chinoReply("success", t('commands:blacklist.addSuccess'))
				break;
			case "remove":
				if (!user || user === null) return message.chinoReply("error", t('commands:blacklist.userNotFound'))

				user.blacklist = false
				user.blacklistReason = null
				user.save()

				message.chinoReply("success", t('commands:blacklist.removeSuccess'))
				break;
			case "view":
				if (!user || user === null) return message.chinoReply("error", t('commands:blacklist.userNotFound'))

				const { tag, _id } = this.client.users.get(user._id);

				const msg = t('commands:blacklist.info', {
					username: tag,
					userId: _id,
					banned: user.blacklist,
					reason: user.blacklistReason,
				})

				message.channel.send(msg, { code: "asciidoc" })
				break;
			default:
				message.chinoReply("error", t('commands:blacklist.invalidOption'))
		}
	}
}
