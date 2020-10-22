const EmbedBuilder = require('../../structures/util/EmbedBuilder')
const Command = require('../../structures/command/Command')
class BanCommand extends Command {
    constructor() {
        super({
            name: 'ban',
            aliases: ['banir'],
            permissions: [{
                entity: 'bot',
                permissions: ['banMembers', 'embedLinks']
            }, {
                entity: 'user',
                permissions: ['banMembers']
            }]
        })
    }

    async run(ctx) {
        if (!ctx.args[0]) return ctx.replyT('error', 'basic:invalidUser')
        let member
        member = await ctx.client.getRESTUser(ctx.args[0].replace(/[<@!>]/g, ''))
        if (!member) return ctx.replyT('error', 'basic:invalidUser')
        let guildMember
        guildMember = ctx.message.channel.guild.members.get(member.id)
        if (guildMember) {
            if (guildMember.user.id === ctx.message.author.id) return ctx.replyT('error', 'basic:punishment.punish-myself')
            if (ctx.message.channel.guild.ownerID === guildMember.user.id || ctx.message.channel.guild.members.get(ctx.message.author.id).roles.position <= guildMember.roles.position) return //FIXME "roles" is an array, not a Role
        } else {
            guildMember = {
                user: {
                    id: member.id,
                    avatarURL: member.avatarURL,
                    username: member.username,
                    discriminator: member.discriminator
                }
            }
        }
        let reason = ctx.args.slice(1).join(' ')
        if (!reason) {
            reason = ctx.t('basic:noReason')
        }

        ctx.client.banGuildMember(ctx.message.guildID, guildMember.user.id, 7, ctx.t('basic:punishment.reason', { 0: `${ctx.message.author.username}#${ctx.message.author.discriminator}`, 1: reason })).then(() => {
            const embed = new EmbedBuilder()
            embed.setColor('MODERATION')
            embed.setThumbnail(guildMember.user.avatarURL)
            embed.setTitle(ctx.t('basic:punishment.banned', { 0: `${guildMember.user.username}#${guildMember.user.discriminator}` }))
            embed.addField(ctx.t('basic:punishment.embed.memberName'), `${guildMember.user.username}#${guildMember.user.discriminator}`, true)
            embed.addField(ctx.t('basic:punishment.embed.memberID'), guildMember.user.id, true)
            embed.addField(ctx.t('basic:punishment.embed.staffName'), `${ctx.message.author.username}#${ctx.message.author.discriminator}`, true)
            embed.addField(ctx.t('basic:punishment.embed.reason'), reason, true)

            ctx.message.channel.createMessage({ embed: embed })

            let server = ctx.db.guild
            if (server.punishModule) {
                ctx.client.getChannel(server.punishChannel).createMessage(embed).catch(() => {
                    server.punishModule = false
                    server.punishChannel = ''
                    server.save()
                    ctx.replyT('error','events:channel-not-found')
                })
            }
        })
    }
}

module.exports = BanCommand
