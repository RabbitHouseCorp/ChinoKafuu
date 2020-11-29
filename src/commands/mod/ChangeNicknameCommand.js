const Command = require("../../structures/command")
module.exports = class ChangeNickCommand extends Command {
	constructor(client) {
		super(client, {
			name: "changenickname",
			category: "mod",
			aliases: ["setnickname", "setarapelido", "alteraraplido"],
			UserPermission: ["MANAGE_NICKNAMES"],
			ClientPermission: ["MANAGE_NICKNAMES"],
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {

		const member = message.mentions.users.first() || this.client.users.cache.get(args[0])
		const nickname = args.slice(1).join(" ")
		if (!member) return message.chinoReply("error", t("commands:mention-null"))
		if (!nickname) return message.chinoReply("error", t("commands:changenickname.args-null"))
		if (message.member.roles.highest.position >= message.guild.me.roles.highest.position) return message.chinoReply("error", t("commands:changenickname.highest-role"))
		message.guild.member.cache.get(member.id).setNickname(nickname).then(() => {
			message.chinoReply("success", t("commands:changenickname.success", { member: member.tag, nickname: nickname }))
		}).catch(err => {
			message.chinoReply("error", t("events:error", { err: err }))
		})
	}
}
