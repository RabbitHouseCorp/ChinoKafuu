const Command = require("../../structures/command")
module.exports = class CmdCommand extends Command {
    constructor(client) {
        super(client, {
            name: "cmd",
            aliases: [],
            category: "dev",
            OnlyDevs: true
        })
    }

    async run({ message, args, server }, t) {
        if (!args[0]) return message.chinoReply("error", "você não informou o comando desejado")
        let cmd = this.client.commands.get(args[0])
        if (!cmd) return message.chinoReply("error", "este comando não existe.")
        let command = await this.client.database.Bots.findById(cmd.config.name)
        if (command.maintenance) {
            command.maintenance = false
            command.maintenanceReason = ""
            command.save().then(() => {
                message.chinoReply("success", "certo, comando removido da manutenção.")
            })
        } else {
            command.maintenance = true
            command.maintenanceReason = args.slice(1).join(" ")
            command.save().then(() => {
                message.chinoReply("warn", "certo, comando adicionado a manutenção.")
            })
        }
    }
}