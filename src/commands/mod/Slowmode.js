const Command = require("../../structures/command")
module.exports = class SlowmodeCommand extends Command {
	constructor(client) {
		super(client, {
			name: "slowmode",
			category: "mod",
			aliases: ["modolento"],
			UserPermission: ["MANAGE_CHANNELS"],
			ClientPermission: ["MANAGE_CHANNELS"],
			OnlyDevs: false
		})
	} 
	run({message, args, server}, t) {
        
		const time = args[0]
		if (!time) return message.chinoReply("error", t("commands:slowmode.args-null"))
		if (time > 600) return message.chinoReply("error", t("commands:slowmode.limit"))
		if (0 < time) {
			message.channel.setRateLimitPerUser(time).then(() => {
				message.chinoReply("success", t("commands:slowmode.enable"))
			})
		} else {
			message.channel.setRateLimitPerUser(time).then(() => {
				message.chinoReply("success",t("commands:slowmode.disable"))
			})
		}
        
	}
}