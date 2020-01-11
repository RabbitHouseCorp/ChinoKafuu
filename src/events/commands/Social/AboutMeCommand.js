const Command = require("../../structures/command")
module.exports = class AboutMeCommand extends Command {
    constructor (client) {
        super(client, {
            name: "aboutme",
            aliases: ["sobremim"],
            category: "social"
        })
    }

    async run({message, args, server}, t) {
        let user = await this.client.database.Users.findById(message.author.id)
        if (!args[0]) return message.chinoReply("error", t("commands:aboutme.args-null"))

        user.aboutme = args.join(" ")
        user.save()

        message.chinoReply("success", t("commands:aboutme.success", {aboutme: user.aboutme}))
    }
}