const Command = require("../../structures/command")
const { RichEmbed } = require("discord.js")
module.exports = class KickCommand extends Command {
    constructor(client) {
       super(client, {
           name: 'kick',
           category: 'mod',
           aliases: ['expulsar'],
           UserPermission: ["KICK_MEMBERS", "MUTE_MEMBERS"],
           ClientPermission: ["KICK_MEMBERS", "MUTE_MEMBERS", "MANAGE_ROLES"],
           OnlyDevs: false,
           hidden: false,
       })
   } 
   run({message, args, server}, t) {
        
        const member = message.mentions.users.first() || this.client.users.get(args[0])
        if (!member) return message.chinoReply('error', t('commands:mention-null'))
        let reason = args.slice(1).join(" ")
        if (reason) {
            reason = t("commands:no-reason")
        }

        if (member.id === message.author.id) return message.chinoReply('error', t('commands:kick.authorKick'))
        if (!message.member(member).kickable) return message.chinoReply('error', t('commands:kick.kickable'))
        if (message.member.highestRole.position < message.guild.member(member).highestRole.position) return message.chinoReply("error", t("commands:punishment.unpunished"))
        
        const embed = new RichEmbed()
        .setTitle(t('commands:kick.kicked', {member: member.tag}))
        .setColor(this.client.colors.moderation)
        .setThumbnail(member.displayAvatarURL)
        .addField(t('commands:punishment.embed.memberName'), member.tag, true)
        .addField(t('commands:punishment.embed.memberID'),member.id, true)
        .addField(t('commands:punishment.embed.staffName'), message.author.tag, true)
        .addField(t('commands:punishment.embed.reason'), reason, true)

        message.guild.member(member).kick(reason).then(() => {
            message.channel.send(embed)
            if (server.punishModule) {
                message.guild.channels.get(server.punishChannel).send(embed).catch(err => {
                    message.channel.send(t("events:channel-not-found"))
                })
            }
        })
    }
}