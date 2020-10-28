const Command = require('../../structures/command/Command')
const EmbedBuilder = require('../../structures/util/EmbedBuilder')

module.exports = class SoftBanCommand extends Command {
  constructor() {
    super({
      name: 'softban',
      arguments: 1,
      permissions: [{
        entity: 'both',
        permissions: ['banMembers']
      }]
    })
  }

  //FIXME arrumar esse comando desgraçado que não funciona
  async run(ctx) {
    const member = ctx.message.mentions[0] || ctx.client.users.get(ctx.args[0])
    if (!member) return ctx.replyT('error', 'basic:invalidMember')
    if (member.id === ctx.message.channel.guild.ownerID) return ctx.replyT('error', 'commands:softban.owner')
    const reason = ctx.args.slice(2).join(" ") || ctx.t('basic:noReason')
    const days = Number(ctx.args[1]) || 7

    ctx.message.channel.guild.banMember(member.id, days, ctx.t('basic:onBehalf', {
      member: ctx.message.author.username,
      reason: reason
    }))
      .then(() => {
        const embed = new EmbedBuilder()
          .setTitle(ctx.t('basic:punishment.softBan'))
          .setColor('MODERATION')
          .setThumbnail(member.dynamicAvatarURL())
          .addField(ctx.t('basic:punishment.memberName'), `${member.username}#${member.discriminator}`, true)
          .addField(ctx.t('basic:punishment.userID'), member.id, true)
          .addField(ctx.t('basic:punishment.staffName'), `${ctx.message.author?.username}#${ctx.message.author?.discriminator}`, true)
          .addField(ctx.t('basic:punishment.reason'), reason, true)
        ctx.send(embed)
        ctx.message.channel.guild.unbanMember(member.id)
        if (ctx.db.guild.punishModule && ctx.db.guild.punishChannel) {
          const channel = ctx.db.guild.punishChannel
          const guildChannel = ctx.message.channel.guild.channels.get(channel)
          return guildChannel.send(embed)
        }
      })
      .catch(err => {
        return ctx.replyT('error', 'commands:softban.error', { error: err.message })
      })
  }
}
