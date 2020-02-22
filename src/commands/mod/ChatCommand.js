const Command = require("../../structures/command")
module.exports = class ChatCommand extends Command {
	constructor(client) {
		super(client, {
			name: "chat",
			category: "mod",
			aliases: [],
			UserPermission: ["MANAGE_CHANNELS"],
			ClientPermission: ["MANAGE_CHANNELS"],
			OnlyDevs: false
		})
	} 
	run({message, args, server}, t) {
        
		let role = message.guild.roles.find(r => r.name === "@everyone")
		switch(args[0]) {
		case "on":
			message.channel.overwritePermissions({
				permissionOverwrites: [
				  {
					id: message.guild.id,
					allow: ["SEND_MESSAGES"]
				  }
				]
			  })
	
			message.chinoReply("success" , t("commands:chat.enable"))
			break
		case "off":
			message.channel.overwritePermissions({
				permissionOverwrites: [
				  {
					id: message.guild.id,
					deny: ["SEND_MESSAGES"]
				  }
				]
			  })
	
			message.chinoReply("success", t("commands:chat.disable"))
			break
		default:
			message.chinoReply("error", t("commands:chat.args-null"))
		} 
	}
}