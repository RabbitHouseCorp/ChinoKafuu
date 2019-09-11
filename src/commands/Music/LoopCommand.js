const Command = require("../../structures/command")
module.exports = class LoopCommand extends Command {
    constructor(client) {
        super(client, {
            name: "loop",
            category: "music",
            aliases: ["repeat", "repetir"],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false
        })
    }

    async execute({message, args, server}, t) {
        
        if (!this.client.player.has(message.guild.id)) return message.chinoReply("error", t("commands:pause.queueClean"))
        if (this.client.player.get(message.guild.id).repeat === false) {
            this.client.player.get(message.guild.id).repeat = true
            message.chinoReply("success", t("commands:loop.enable"))
        } else {
            this.client.player.get(message.guild.id).repeat = false
            message.chinoReply("success", t("commands:loop.disable"))
        }
    }
}