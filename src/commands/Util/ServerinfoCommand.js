const Command = require("../../structures/command")
const Discord = require('discord.js')
const moment = require('moment')
module.exports = class ServerinfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'serverinfo',
            category: 'util',
            aliases: [],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false,
        })
    } 
    execute({message, args, server}, t) {
        moment.locale(server.lang)
    
        let voice = message.guild.channels.filter(c => c.type === 'voice').size
        let text = message.guild.channels.filter(c => c.type === 'text').size
        let category = message.guild.channels.filter(c => c.type === 'category').size
        let user = message.guild.members.filter(member => !member.user.bot).size
        let bot = message.guild.members.filter(member => member.user.bot).size
        let roles = `${message.guild.roles.map(r => `\`${r.name}\``).join(', ')}`.replace('`@everyone`,', '')
        
        const embed = new this.client.Discord.RichEmbed()
        embed.setAuthor(t('commands:serverinfo.name', {name: message.guild.name}), message.guild.iconURL)
        embed.setColor(this.client.colors.default)
        message.guild.icon ? embed.setThumbnail(`${message.guild.iconURL}`.replace('jpg', 'png')) : null
        embed.addField(t('commands:serverinfo.guildName'), message.guild.name, true)
        embed.addField(t('commands:serverinfo.guildID'), message.guild.id, true)
        embed.addField(t('commands:serverinfo.guildOwnerTag'), message.guild.owner.user.tag, true)
        embed.addField(t('commands:serverinfo.guildOwnerID'), message.guild.owner.user.id, true)
        embed.addField(t('commands:serverinfo.guildRegion'), message.guild.region, true)
        embed.addField(t('commands:serverinfo.afkChannel'), `${message.guild.afkChannel}`.replace('null', t('commands:serverinfo.noAfkChannel')), true)
        embed.addField(t('commands:serverinfo.createdAt'), moment.utc(message.guild.createdAt).format('LLLL'), true)
    
        const page2 = new this.client.Discord.RichEmbed()
        embed.setAuthor(t('commands:serverinfo.name', {name: message.guild.name}), message.guild.iconURL)
        embed.setColor(this.client.colors.default)
        message.guild.icon ? embed.setThumbnail(`${message.guild.iconURL}`.replace('jpg', 'png')) : null
        page2.addField(t('commands:serverinfo.guildChannel', {totalChannel: message.guild.channels.size}), t('commands:serverinfo.channels', {voice: voice, text: text, category: category}), true)
        page2.addField(t('commands:serverinfo.guildMembers', {totalMember: message.guild.memberCount}), t('commands:serverinfo.members', {user: user, bot: bot}), true)
        page2.addField(t('commands:serverinfo.roles', {totalRole: message.guild.roles.size - 1}), roles, true)
        
        message.channel.send(embed).then(msg => {
            setTimeout(function() {
                msg.react('⬅')
            }, 500)
            setTimeout(function() {
                msg.react('➡')
            }, 1000)
            const collector = msg.createReactionCollector((r, u) => (r.emoji.name === '⬅', '➡') && (u.id !== this.client.user.id && u.id === message.author.id))
            collector.on('collect', r => {
                r.remove(message.author.id)
                switch (r.emoji.name) {
                    case '⬅':
                        msg.edit(embed)
                        break;
                    case '➡':
                        msg.edit(page2)
                }
            })
        })
    }
}
