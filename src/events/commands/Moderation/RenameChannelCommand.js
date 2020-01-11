const Command = require("../../structures/command")
module.exports = class RenameChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: "renamechannel",
            category: "mod",
            aliases: ["renomearcanal"],
            UserPermission: ["MANAGE_CHANNELS"],
            ClientPermission: ["MANAGE_CHANNELS"]
        })
    }

    async run({message, args, server}, t) {
        let channel = message.mentions.channels.first() || message.guild.channels.get(args[0])
        if (!channel) return message.chinoReply("error", t("commands:renamechannel.channel-mention-null"))
        let name = args.slice(1).join("\u2006").replace("&", "＆").replace("|", "│") 
        if (!name) return message.chinoReply("error", t("commands:renamechannel.args-null"))

        channel.setName(name).then(() => {
            message.chinoReply("success", t("commands:renamechannel.success"))
        })
    }
}