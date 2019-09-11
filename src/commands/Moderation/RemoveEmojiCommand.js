const Command = require("../../structures/command")
const Discord = require('discord.js')
module.exports = class RemoveEmojiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'removeemoji',
            category: 'mod',
            aliases: ['removeremoji'],
            UserPermission: ["MANAGE_EMOJIS"],
            ClientPermission: ["MANAGE_EMOJIS"],
            OnlyDevs: false,
            hidden: false,
        })
    } 
   execute({message, args, server}, t) {
            
        if (!args[0]) return message.chinoReply('error', t('commands:emoji.args-null'))

        let emoji = Discord.Util.parseEmoji(args[0]) || message.guild.emojis.find(r => r.name === args[0]) || message.guild.emojis.get(args[0])
        message.guild.deleteEmoji(emoji.id).then(() => {
            message.chinoReply('trash', t('commands:removeemoji.success'))
        })
    }
}