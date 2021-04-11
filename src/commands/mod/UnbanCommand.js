// FUTURE[epic=KafuuTeam] Deprecate
// NOTE Possible command clutter
// NOTE Moderation downscale

const { Command, EmbedBuilder } = require('../../utils')

module.exports = class UnbanCommand extends Command {
  constructor () {
    super({
      name: 'unban',
      aliases: ['desbanir'],
      permissions: [{
        entity: 'bot',
        permissions: ['banMembers', 'embedLinks']
      },
      {
        entity: 'user',
        permissions: ['banMembers']
      }],
      arguments: 1
    })
  }

  async run (ctx) {
    const guild = ctx.message.channel.guild
    const bans = await guild.getBans()
    const member = bans.find(ban => ban.user.username.toLowerCase().includes(ctx.args[0]?.toLowerCase())) || bans.find(ban => ban.user.id === ctx.args[0])
    if (!member) return ctx.replyT('error', 'commands:unban.notBanned')
    let reason = ctx.args.slice(1).join(' ')
    if (!reason) {
      reason = ctx._locale('basic:noReason')
    }

    guild.unbanMember(member.user.id, ctx._locale('basic:punishment.reason', { 0: `${ctx.message.author.username}#${ctx.message.author.discriminator}`, 1: reason })).then(() => {
      const embed = new EmbedBuilder()
      embed.setColor('MODERATION')
      embed.setThumbnail(member.user.avatarURL)
      embed.setTitle(ctx._locale('basic:punishment.unbanned', { 0: `${member.user.username}#${member.user.discriminator}` }))
      embed.addField(ctx._locale('basic:punishment.embed.memberName'), `${member.user.username}#${member.user.discriminator} (\`${member.user.id}\`)`)
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

        channel.createMessage(embed.build())
      }
    })
  }
}
