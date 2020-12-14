const { Command, EmbedBuilder } = require('../../utils')
const moment = require('moment')
module.exports = class UserInfoCommand extends Command {
    constructor() {
        super({
            name: 'userinfo',
            aliases: [],
            permissions: [{
                entity: 'bot',
                permissions: ['embedLinks']
            }]
        })
    }

    async run(ctx) {
        moment.locale(ctx.db.guild.lang)
        let member

        if (ctx.args[0]) {
            try {
                member = await ctx.client.getRESTUser(ctx.args[0].replace(/[<@!>]/g, ''))
            } catch {
                member = ctx.message.author
            }
        } else {
            member = ctx.message.author
        }
        const guild = ctx.message.channel.guild
        const highRole = guild.roles.get(guild.members.get(member.id)?.roles[0])
        let roleSize = guild.members.get(member.id) ? guild.members.get(member.id).roles.length : '0'
        const embed = new EmbedBuilder()
        embed.setColor(`#${highRole?.color.toString(16)}` ?? null)
        embed.setThumbnail(member.dynamicAvatarURL())
        embed.addField(ctx._locale('commands:userinfo.username'), `${member.username}#${member.discriminator}`, true)
        embed.addField(ctx._locale('commands:userinfo.userid'), member.id, true)
        embed.addField(ctx._locale('commands:userinfo.createdAt'), moment(member.createdAt).format('LLLL'), true)
        guild.members.get(member.id) ? embed.addField(ctx._locale('commands:userinfo.joinedAt'), moment(guild.members.get(member.id).joinedAt).format('LLLL'), true) : null
        guild.members.get(member.id) ? embed.addField(ctx._locale('commands:userinfo.highRole'), guild.roles.get(guild.members.get(member.id)?.roles[0])?.mention, true) : null
        guild.members.get(member.id)?.premiumSince ? embed.addField(ctx._locale('commands:userinfo.boostSince'), moment(guild.members.get(member.id).premiumSince).format('LLLL'), true) : null
        guild.members.get(member.id) ? embed.addField(ctx._locale('commands:userinfo.hasPermissions'), this.checkPermission(ctx._locale, guild, member).join(', ')) : null
        
        ctx.send(embed.build())
    }

    checkPermission(_locale, guild, member) {
        let allowedPerms = []
        const perms = [
            'createInstantInvite',
            'kickMembers',
            'banMembers',
            'administrator',
            'manageChannels',
            'manageGuild',
            'addReactions',
            'viewAuditLogs',
            'voicePrioritySpeaker',
            'stream',
            'readMessages',
            'sendMessages',
            'sendTTSMessages',
            'manageMessages',
            'embedLinks',
            'attachFiles',
            'readMessageHistory',
            'mentionEveryone',
            'externalEmojis',
            'viewGuildInsights',
            'voiceConnect',
            'voiceSpeak',
            'voiceMuteMembers',
            'voiceDeafenMembers',
            'voiceMoveMembers',
            'voiceUseVAD',
            'changeNickname',
            'manageNicknames',
            'manageRoles',
            'manageWebhooks',
            'manageEmojis'
        ]

        perms.forEach(perms => {
            if (guild.members.get(member.id).permissions.json[perms]) {
                allowedPerms.push(`\`${_locale(`permission:${perms}`)}\``)
            }
        })

        return allowedPerms
    }
}
