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
   run({message, args, server}, t) {
            
        const url = message.attachments.first() ? message.attachments.first().url : undefined || args[1]
        if (!url || url === undefined) return message.chinoReply("error", t("commands:addemoji.args-null"))
        const name = args[0]
        if (!name) return message.chinoReply("error", t("commands:addemoji.name-null"))
        if (!message.attachments.first()) {
            message.guild.createEmoji(url, name).then(emoji => {
                message.channel.send(`${emoji} **|** ${message.author}, ${t('commands:addemoji.success')}`)
            }).catch(() => {
                message.chinoReply("error", t('commands:addemoji.error'))
            })
        } else {
            message.guild.createEmoji(url, name).then(emoji => {
                message.channel.send(`${emoji} **|** ${message.author}, ${t('commands:addemoji.success')}`)
            }).catch(() => {
                message.chinoReply("error", t('commands:addemoji.error'))
            })
        }
    }
}
