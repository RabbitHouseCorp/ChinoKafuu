const { Command, EmbedBuilder } = require('../../../utils')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class SoftBanCommand extends Command {
  constructor() {
    super({
      name: 'softban',
      arguments: 1,
      permissions: [{
        entity: 'both',
        permissions: ['banMembers']
      }],
      slash: new CommandBase()
        .setName('softban')
        .setDescription('Soft bans a user. If `purge-days` ends unspecified, the default value (7) will be used.')
        .addOptions(
          new CommandOptions()
            .setType(6)
            .setName('user')
            .setDescription('Mention member on server.')
            .isRequired(),
          new CommandOptions()
            .setType(4)
            .setName('purge-days')
            .setDescription('Mention the duration')
            .isRequired(),
          new CommandOptions()
            .setType(3)
            .setName('reason')
            .setDescription('Inform reason')
            .isRequired(),
        )
    })
  }

  async run(ctx) {
    const member = await ctx.getUser(ctx.args[0])
    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    if (member.id === ctx.message.guild.ownerID) return ctx.replyT('error', 'commands:softban.owner')
    const reason = ctx.args.slice(2).join(' ') || ctx._locale('basic:noReason')
    const days = Number(ctx.args[1]) || 7

    ctx.client.banGuildMember(ctx.message.guildID, member.id, days, ctx._locale('basic:punishment.reason', {
      0: ctx.message.author.username,
      1: reason
    }))
      .then(() => {
        const embed = new EmbedBuilder()
        embed.setTitle(ctx._locale('basic:punishment.softBan', { member: `${member.username}#${member.discriminator}` }))
        embed.setColor('MODERATION')
        embed.setThumbnail(member.avatarURL)
        embed.addField(ctx._locale('basic:punishment.memberName'), `${member.username}#${member.discriminator}`, true)
        embed.addField(ctx._locale('basic:punishment.embed.memberName'), `${member.username}#${member.discriminator} (\`${member.id}\`)`)
        embed.addField(ctx._locale('basic:punishment.embed.staffName'), `${ctx.message.author.username}#${ctx.message.author.discriminator} (\`${ctx.message.author.id}\`)`)
        embed.addField(ctx._locale('basic:punishment.embed.reason'), reason)

        ctx.send(embed.build())
        ctx.client.unbanGuildMember(ctx.message.guildID, member.id)
        if (ctx.db.guild.punishModule && ctx.db.guild.punishChannel) {
          const channel = ctx.db.guild.punishChannel
          const guildChannel = ctx.message.guild.channels.get(channel)
          return guildChannel.createMessage(embed.build())
        }
      })
      .catch(err => {
        return ctx.replyT('error', 'commands:softban.error', { error: err.message })
      })
  }
}
