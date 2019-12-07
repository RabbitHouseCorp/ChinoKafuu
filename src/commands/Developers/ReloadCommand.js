const Command = require("../../structures/command")
module.exports = class ReloadCommand extends Command {
    constructor(client) {
        super(client, {
            name: "reload",
            aliases: ["recarregar", "r"],
            category: "developers",
            OnlyDevs: true
        })
    }

    run({ message, args, server }, t) {
        const command = args[0]
        const cmd = this.client.reloadCommand(command)

        if (!cmd) return message.chinoReply("error", t('commands:reload.commandNotFound'))

        message.chinoReply("success", t('commands:reload.success'))
    }
}