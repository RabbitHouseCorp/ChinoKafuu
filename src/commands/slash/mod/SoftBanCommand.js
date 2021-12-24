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
            .setType(3)
            .setName('reason')
            .setDescription('Inform reason'),
          new CommandOptions()
            .setType(4)
            .setName('purge-days')
            .setDescription('Mention the duration')
        )
    })
  }

  async run(ctx) {
    const member = await ctx.getMember(ctx.args.get('user').value?.id ?? ctx.args.get('user').value)
    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    if (member.id === ctx.message.member.id) return ctx.replyT('error', 'basic:punishment.selfPunishment')
    if (member.id === ctx.message.guild.ownerID) return ctx.replyT('error', 'basic:punishment.ownerPunish')
    const reason = ctx.args.get('reason')?.value ?? ctx._locale('basic:noReason')
    const days = Number(ctx.args.get('purge-days')?.value) ?? 7

    ctx.client.banGuildMember(ctx.message.guild.id, member.id, days, ctx._locale('basic:punishment.reason', {
      0: ctx.message.author.username,
      1: reason
    }))
      .then(() => {
        const embed = new EmbedBuilder()
        embed.setTitle(ctx._locale('basic:punishment.softBan', { 0: `${member.username}#${member.discriminator}` }))
        embed.setColor('MODERATION')
        embed.setThumbnail(member.avatarURL)
        embed.addField(ctx._locale('basic:punishment.memberName'), `${member.username}#${member.discriminator}`, true)
        embed.addField(ctx._locale('basic:punishment.embed.memberName'), `${member.username}#${member.discriminator} (\`${member.id}\`)`)
        embed.addField(ctx._locale('basic:punishment.embed.staffName'), `${ctx.message.author.username}#${ctx.message.author.discriminator} (\`${ctx.message.author.id}\`)`)
        embed.addField(ctx._locale('basic:punishment.embed.reason'), reason)

        ctx.send(embed.build())
        ctx.client.unbanGuildMember(ctx.message.guild.id, member.id)
        if (ctx.db.guild.punishModule && ctx.db.guild.punishChannel) {
          const channel = ctx.db.guild.punishChannel
          const guildChannel = ctx.message.guild.channels.get(channel)
          return guildChannel.createMessage(embed.build())
        }
      })
      .catch(() => {
        return ctx.replyT('error', 'basic:punishment.error')
      })
  }
}
