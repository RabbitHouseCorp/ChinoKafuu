const Command = require("../../structures/command")
module.exports = class CongaParrotCommand extends Command {
    constructor (client) {
        super (client, {
            name: 'congaparrot',
            category: 'fun',
            aliases: [],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false
        })
    }
    execute({message, args, server}, t) {
        if (args[0] > 20) return message.chinoReply('error', t('commands:congaparrot.limited'))
        if (!args[0]) return message.chinoReply('error', t('commands:congaparrot.args-null'))
        
        message.channel.send("<a:parrot_dance:554489834417291285>".repeat(args[0]))
    }
}