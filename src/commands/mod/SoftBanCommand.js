const Command = require('../../structures/command/Command')
const { EmbedBuilder } = require('../../utils')

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

  async run(ctx) {
    const member = ctx.message.mentions[0] || ctx.client.users.get(ctx.args[0])
    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    if (member.id === ctx.message.channel.guild.ownerID) return ctx.replyT('error', 'commands:softban.owner')
    const reason = ctx.args.slice(2).join(" ") || ctx.t('basic:noReason')
    const days = Number(ctx.args[1]) || 7

    ctx.client.banGuildMember(ctx.message.guildID, member.id, days, ctx.t('basic:punishment.reason', {
      0: ctx.message.author.username,
      1: reason
    }))
      .then(() => {
        const embed = new EmbedBuilder()
        embed.setTitle(ctx.t('basic:punishment.softBan', { member: `${member.username}#${member.discriminator}` }))
        embed.setColor('MODERATION')
        embed.setThumbnail(member.dynamicAvatarURL())
        embed.addField(ctx.t('basic:punishment.memberName'), `${member.username}#${member.discriminator}`, true)
        embed.addField(ctx.t('basic:punishment.embed.memberName'), `${member.username}#${member.discriminator} (\`${member.id}\`)`)
        embed.addField(ctx.t('basic:punishment.embed.staffName'), `${ctx.message.author.username}#${ctx.message.author.discriminator} (\`${ctx.message.author.id}\`)`)
        embed.addField(ctx.t('basic:punishment.embed.reason'), reason)

        ctx.send(embed)
        ctx.client.unbanGuildMember(ctx.message.guildID, member.id)
        if (ctx.db.guild.punishModule && ctx.db.guild.punishChannel) {
          const channel = ctx.db.guild.punishChannel
          const guildChannel = ctx.message.channel.guild.channels.get(channel)
          return guildChannel.createMessage({ embed: embed })
        }
      })
      .catch(err => {
        return ctx.replyT('error', 'commands:softban.error', { error: err.message })
      })
  }
}
