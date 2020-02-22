const Command = require("../../structures/command")
module.exports = class BlackListCommand extends Command {
	constructor(client) {
		super(client, {
			name: "blacklist",
			category: "developers",
			aliases: ["listanegra"],
			UserPermission: null,
			ClientPermission: null,
			OnlyDevs: true
		})
	}
	async run({ message, args, server }, t) {
		let user = await this.client.database.Users.findById(args[1])
		let user2 = await this.client.users.fetch(args[1])
		switch (args[0]) {
			case "add":
				if (!user || user === null) return message.chinoReply("error", "usuário não encontrado, tente informar o ID da próxima vez.")
				user.blacklist = true
				user.blacklistReason = args.slice(2).join(" ")
				user.save()

				message.chinoReply("success", "usuário banido com sucesso.")
				break
			case "remove":
				if (!user || user === null) return message.chinoReply("error", "usuário não encontrado, tente informar o ID da próxima vez.")
				user.blacklist = false
				user.blacklistReason = null
				user.save()

				message.chinoReply("success", "usuário desbanido com sucesso.")
				break
			case "view":
				if (!user || user === null) return message.chinoReply("error", "usuário não encontrado, tente informar o ID da próxima vez.")
				let msg = `== USER BANNED INFO ==\n\n• User :: ${user2.tag} - (${user2.id})\n• Banned :: ${user.blacklist}\n• Reason :: ${user.blacklistReason}`
				message.channel.send(msg, { code: "asciidoc" })
				break
			default:
				message.chinoReply("error", "você precisa escolher entre `add`, `remove`, `view`")
		}
	}
}
