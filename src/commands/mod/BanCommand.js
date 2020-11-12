const { EmbedBuilder } = require('../../utils')
const Command = require('../../structures/command/Command')
class BanCommand extends Command {
    constructor() {
        super({
            name: 'ban',
            aliases: ['banir'],
            arguments: 1,
            permissions: [{
                entity: 'both',
                permissions: ['banMembers', 'embedLinks']
            }]
        })
    }

    async run(ctx) {
        let member = ctx.args[0].replace(/[<@!>]/g, '')
        let guildMember = ctx.message.channel.guild.members.get(member)
        if (guildMember) {
            if (guildMember.user.id === ctx.message.author.id) return ctx.replyT('error', 'commands:ban.selfBan')
            if (guildMember.user.id === ctx.message.channel.guild.ownerID) return ctx.replyT('error', 'commands:ban.ownerBan')
        } else {
            member = ctx.client.users.get(member)
            if (!member) return ctx.replyT('error', 'basic:invalidUser')
            guildMember = {
                user: {
                    id: member.id,
                    avatarURL: member.avatarURL,
                    username: member.username,
                    discriminator: member.discriminator
                }
            }
        }

        const reason = ctx.args.slice(1).join(' ') || ctx.t('basic:noReason')
        try {
            ctx.client.banGuildMember(ctx.message.guildID, guildMember.user.id, 7, ctx.t('basic:punishment.reason', { 0: `${ctx.message.author.username}#${ctx.message.author.discriminator}`, 1: reason })).then(() => {
                const embed = new EmbedBuilder()
                embed.setColor('MODERATION')
                embed.setThumbnail(guildMember.user.avatarURL)
                embed.setTitle(ctx.t('basic:punishment.banned', { 0: `${guildMember.user.username}#${guildMember.user.discriminator}` }))
                embed.addField(ctx.t('basic:punishment.embed.memberName'), `${guildMember.user.username}#${guildMember.user.discriminator} (\`${guildMember.user.id}\`)`)
                embed.addField(ctx.t('basic:punishment.embed.staffName'), `${ctx.message.author.username}#${ctx.message.author.discriminator} (\`${ctx.message.author.id}\`)`)
                embed.addField(ctx.t('basic:punishment.embed.reason'), reason)

                ctx.send(embed)

                const server = ctx.db.guild
                if (server.punishModule) {
                    const channel = ctx.message.channel.guild.channels.get(server.punishChannel)
                    if (!channel) {
                        server.punishModule = false
                        server.punishChannel = ''
                        server.save()
                        return ctx.replyT('error', 'events:channel-not-found')
                    }

                    channel.createMessage({ embed: embed })
                }
            })
        } catch {
            await ctx.replyT('error', 'commands:ban.error')
        }
    }
}

module.exports = BanCommand
