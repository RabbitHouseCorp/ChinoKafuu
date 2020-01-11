const Command = require("../../structures/command")
module.exports = class ReportCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'report',
            category: 'util',
            aliases: ['reportar'],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false,
        })
    } 
    run({message, args, server}, t) {
        

        if (server.reportModule == false) return message.chinoReply('error', t('commands:report.disable'))
        if (server.channelReport == undefined) return message.chinoReply('error', t('commands:report.undefined'))
        const member = message.mentions.users.first() || this.client.users.get(args[0])
        if (!member) return message.chinoReply('error', t('commands:mention-null'))
        const reason = args.slice(1).join(' ')
        if (!reason) return message.chinoReply('error', t('commands:report.reasonNull'))
        const channel = message.guild.channels.get(server.channelReport)

        const embed = new this.client.Discord.RichEmbed()
        .setColor(this.client.colors.moderation)
        .setThumbnail(member.displayAvatarURL)
        .addField(t('commands:report.memberName'), member.tag, true)
        .addField(t('commands:report.memberID'), member.id, true)
        .addBlankField(true)
        .addField(t('commands:report.authorName'), message.author.tag, true)
        .addField(t('commands:report.authorID'), message.author.id, true)
        .addBlankField(true)
        .addField(t('commands:report.channel'), message.channel, true)
        .addField(t('commands:report.reason'), reason, true)

        channel.send(embed)
        message.chinoReply('success', t('commands:report.success'))
        
    }
}