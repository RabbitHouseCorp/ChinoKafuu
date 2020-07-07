const Command = require("../../structures/command")
module.exports = class AddRoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: "addrole",
			category: "mod",
			aliases: ["adicionarcargo"],
			UserPermission: ["MANAGE_ROLES"],
			ClientPermission: ["MANAGE_ROLES"],
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {

		let member = message.mentions.users.first() || this.client.users.cache.get(args[0])
		if (!member) return message.chinoReply("error", t("commands:mention-null"))
		let role = message.mentions.roles.array()[1] || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(r => r.name === args.slice(1).join(" "))
		if (!role) return message.chinoReply("error", t("commands:addrole.mentionRoleNull"))

		message.guild.member(member).roles.add(role.id).then(() => {
			message.chinoReply("success", t("commands:addrole.roleAdd"))
		}).catch(() => {
			message.chinoReply("error", t("commands:addrole.noPerm"))
		})
	}
}
