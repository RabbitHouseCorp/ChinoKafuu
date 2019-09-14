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
        let member = message.mentions.users.first() || this.client.users.get(args[0]) || message.author
        let user = await this.client.database.Users.findById(member.id)
        if (!user || user === null) {
            let novoUser = new this.client.database.Users({
                '_id': member.id
            })
            novoUser.save()
        }
        if (message.author.id === member.id) {
            message.chinoReply('yen', t('commands:yen.totalYens', {yens: user.yens}))
        } else {
            message.chinoReply("yen", t("commands:yen.user-total", {member: member, yens: user.yens}))
        }
    }
}
