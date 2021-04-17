// FUTURE[epic=KafuuTeam] Deprecate/Overlap
// NOTE Moderation downscale

const { Command, EmbedBuilder } = require('../../utils')
module.exports = class BanCommand extends Command {
  constructor () {
    super({
      name: 'ban',
      aliases: ['banir'],
      arguments: 1,
      hasUsage: true,
      overlaps: true,
      permissions: [{
        entity: 'both',
        permissions: ['banMembers', 'embedLinks']
      }]
    })
  }

  async run (ctx) {
    const member = await ctx.getUser(ctx.args[0])
    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    const guildMember = ctx.message.channel.guild.members.get(member.id)
    if (guildMember) {
      if (member.id === ctx.message.author.id) return ctx.replyT('error', 'commands:ban.selfBan')
      if (member.id === ctx.message.channel.guild.ownerID) return ctx.replyT('error', 'commands:ban.ownerBan')
    }

    const reason = ctx.args.slice(1).join(' ') || ctx._locale('basic:noReason')
    try {
      ctx.client.banGuildMember(ctx.message.guildID, member.id, 7, ctx._locale('basic:punishment.reason', { 0: `${ctx.message.author.username}#${ctx.message.author.discriminator}`, 1: reason })).then(() => {
        const embed = new EmbedBuilder()
        embed.setColor('MODERATION')
        embed.setThumbnail(member.avatarURL)
        embed.setTitle(ctx._locale('basic:punishment.banned', { 0: `${member.username}#${member.discriminator}` }))
        embed.addField(ctx._locale('basic:punishment.embed.memberName'), `${member.username}#${member.discriminator} (\`${member.id}\`)`)
        embed.addField(ctx._locale('basic:punishment.embed.staffName'), `${ctx.message.author.username}#${ctx.message.author.discriminator} (\`${ctx.message.author.id}\`)`)
        embed.addField(ctx._locale('basic:punishment.embed.reason'), reason)

        ctx.send(embed.build())

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
