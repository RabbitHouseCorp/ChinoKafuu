const Command = require("../../structures/command")
module.exports = class ChooseCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'choose',
            category: 'random',
            aliases: ['escolher'],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false,
        })
    } 
    execute({message, args, server}, t) {
            
        if (!args[0]) return message.chinoReply('error', t('commands:choose.args-null'))
        let choose = args.join(' ').split(', ')
        let c = choose[Math.floor(Math.random() * choose.length)]

        message.reply(t('commands:choose.choose', {choose: c}))
    }
}