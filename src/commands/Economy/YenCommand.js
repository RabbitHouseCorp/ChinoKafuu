const Command = require("../../structures/command")

module.exports = class YensCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'yens',
            category: 'economy',
            aliases: ['yen']
        })
    }
    async execute({message, args, server}, t) {
        let user = await this.client.database.Users.findById(message.author.id)
        if (!user || user === null) {
            let novoUser = new this.client.database.Users({
                '_id': message.author.id
            })
            novoUser.save()
        }

        message.chinoReply('yen', t('commands:yen.totalYens', {
          yens: user.yens
        }))
    }
}