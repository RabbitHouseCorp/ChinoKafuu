const Command = require("../../structures/command")
module.exports = class AddEmoji extends Command {
    constructor(client) {
       super(client, {
           name: 'addemoji',
           category: 'mod',
           aliases: ['adicionaremoji'],
           UserPermission: ["MANAGE_EMOJIS"],
           ClientPermission: ["MANAGE_EMOJIS"],
           OnlyDevs: false,
           hidden: false,
       })
   } 
   execute({message, args, server}, t) {
            
        const url = args[1] || message.attachments.first().url
        const name = args[0]

        message.guild.createEmoji(url, name).then(emoji => {
            message.chinoReply("success", t('commands:addemoji.success', {emoji: emoji}))
        }).catch(() => {
            message.chinoReply("error", t('commands:addemoji.error'))
        })
    }
}