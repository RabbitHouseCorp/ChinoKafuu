const Command = require("../../structures/command")
module.exports = class AddYensCommand extends Command {
    constructor(client) {
        super(client, {
            name: "addyens",
            aliases: [],
            category: "dev",
            OnlyDevs: true
        })
    }
    
    async run({ message, args, server }, t) {
        if (!args[0]) return message.chinoReply("error", "você precisa colocar o ID do usuário.")
        let member = await this.client.shardManager.getUsers(args[0].replace(/[<@!>]/g, ""))
        if (!member) return message.chinoReply("error", `eu não encontrei um usuário com o ID \`${args[0]}\`.`)
        let user = await this.client.database.Users.findById(args[0].replace(/[<@!>]/g, ""))
        if (!args[1]) return message.chinoReply("error", "você não colocou a quantia que quer adicionar.")

        user.yens += args[1]
        user.save()
        
        message.chinoReply("success", `certo, eu adicionei \`${Number(args[1]).toLocaleString()}\` yens na conta do usuário com o ID: \`${args[0]}\``)
    }
}
