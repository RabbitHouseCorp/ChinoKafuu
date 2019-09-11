const Command = require("../../structures/command")
const Discord = require('discord.js')
const moment = require('moment')
module.exports = class EmojiinfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'emojiinfo',
            category: 'util',
            aliases: ['emoji-info'],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false,
        })
    } 
    execute({message, args, server}, t) {
        
        moment.locale(server.lang)
    
        if (!args[0]) return message.chinoReply('error', t('commands:emoji.args-null'))
        let a = Discord.Util.parseEmoji(args[0]) || message.guild.emojis.find(emoji => emoji.name === args.join(" "))
        let emoji = message.guild.emojis.get(a.id)
        let animated = emoji.animated;
        if (emoji.animated === true) animated = t('commands:emojiinfo.animated')
        if (emoji.animated === false) animated = t('commands:emojiinfo.noanimated')
        
        let embed = new this.client.Discord.RichEmbed()
        .setColor(this.client.colors.default)
        .setThumbnail(emoji.url)
        .addField(t('commands:emojiinfo.name'), `\`${emoji.name} \``, true)
        .addField(t('commands:emojiinfo.id'), `\`${emoji.id}\``, true)
        .addField(t('commands:emojiinfo.createdAt'), moment.utc(emoji.createdAt).format('LLLL'), true)
        .addField(t('commands:emojiinfo.hisAnimated'), animated, true)
        .addField(t('commands:emojiinfo.mention'), `\`${emoji}\``, true)
        .addField('Download', emoji.url, true)
    
        message.channel.send(embed)
        
    }
}