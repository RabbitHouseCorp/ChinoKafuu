const Command = require("../../structures/command")
const parse = require('parse-duration')

module.exports = class SeekCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'seek',
            category: 'music',
            aliases: ['posicao'],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false,
        })
    } 
    execute({message, args, server}, t) {
        
        if (!this.client.player.has(message.guild.id)) return message.chinoReply('error', t('commands:pause.queueNull'))
        if (!args[0]) return message.chinoReply('error', t('commands:seek.args-null'))

        message.chinoReply('success', t('commands:seek.success'))
        this.client.player.get(message.guild.id).player.seek(parse(`${args[0]}`))
    }
}
