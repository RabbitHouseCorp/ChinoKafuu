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

    execute({message, args, server}) {
        let command = args[0]
        let cmd = this.client.reloadCommand(command)
        if (!cmd) return message.chinoReply("error", "comando não encontrado.")
        message.chinoReply("success", "comando recarregado com sucesso!")
    }
}