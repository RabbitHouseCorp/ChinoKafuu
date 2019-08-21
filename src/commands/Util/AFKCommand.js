const Command = require("../../structures/command")
module.exports = class AFKCommand extends Command {
    constructor(client) {
        super(client, {
            name: "afk",
            category: "util",
            aliases: ["awayfromthekeyboard"],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false
        })
    }

    async execute({message, args, server}, t) {
        let user = await this.client.database.Users.findById(message.author.id)
        let reason = args.join(" ")
        if (!reason) {
            reason = null
        }
        user.afk = true
        user.afkReason = reason
        user.save()

        message.chinoReply("success", t("commands:afk.enable"))
    }
}