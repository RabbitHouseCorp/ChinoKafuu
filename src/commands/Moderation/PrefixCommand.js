const Command = require("../../structures/command")
module.exports = class PrefixCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'prefix',
            category: 'mod',
            aliases: ['prefixo'],
            UserPermission: ['MANAGE_GUILD'],
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false,
        })
    } 
    execute({message, args, server}, t) {

        if (args[0].length > 3) return message.chinoReply('error', t('commands:prefix.limit'))
        if (!args[0]) return message.chinoReply('error', t('commands:prefix.args-null'))
        server.prefix = args[0]
        server.save()

        message.chinoReply('success', t('commands:prefix.success'))
        
   }
}