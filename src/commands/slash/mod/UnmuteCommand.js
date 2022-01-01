const { Command, EmbedBuilder } = require('../../../utils')
const { CommandBase, CommandOptions } = require('eris')
module.exports = class UnmuteCommand extends Command {
  constructor() {
    super({
      name: 'unmute',
      aliases: [],
      arguments: 1,
      hasUsage: true,
      permissions: [{
        entity: 'both',
        permissions: ['moderateMembers']
      }],
      slash: new CommandBase()
        .setName('unmute')
        .setDescription('Remove the mute for the member in the guild')
        .addOptions(
          new CommandOptions()
            .setType(6)
            .setName('user')
            .setDescription('To unmute the member.')
            .isRequired(),
          new CommandOptions()
            .setType(3)
            .setName('reason')
            .setDescription('Enter reason to unmute the member.')
        )
    })
  }

  async run(ctx) {
    const member = await ctx.getUser(ctx.args.get('user').value?.id ?? ctx.args.get('user').value)
    const guildMember = ctx.message.guild.members.get(member.id)
    const reason = ctx._locale('basic:punishment.reason', {
      0: `${ctx.message.member.user.username}#${ctx.message.member.user.discriminator}`, 1: ctx.args.get('reason') ?
        ctx.args.get('reason').value : ctx._locale('basic:noReason')
    })
    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    if (guildMember) {
      if (member.id === ctx.message.member.id) return ctx.replyT('error', 'basic:punishment.selfPunishment')
      if (member.id === ctx.message.guild.ownerID) return ctx.replyT('error', 'basic:punishment.ownerPunish')
    }

    if (reason.trim().length > 512) return ctx.reply('error', 'basic:punishment.bigReason')

    try {
      ctx.client.setGuildMemberTimeout(ctx.message.guild.id, member.id, null, reason).then(() => {
        const embed = new EmbedBuilder()
        embed.setColor('MODERATION')
        embed.setThumbnail(member.avatarURL)
        embed.setTitle(ctx._locale('basic:punishment.unmuted', { 0: `${member.username}#${member.discriminator}` }))
        embed.addField(ctx._locale('basic:punishment.embed.memberName'), `${member.username}#${member.discriminator} (\`${member.id}\`)`)
        embed.addField(ctx._locale('basic:punishment.embed.staffName'), `${ctx.message.member.username}#${ctx.message.member.discriminator} (\`${ctx.message.member.id}\`)`)
        embed.addField(ctx._locale('basic:punishment.embed.reason'), ctx.args.get('reason')?.value ?? ctx._locale('basic:noReason'))

        ctx.send(embed.build())

        const server = ctx.db.guild
        if (server.punishModule) {
          const channel = ctx.message.guild.channels.get(server.punishChannel)
          if (!channel) {
            server.punishModule = false
            server.punishChannel = ''
            server.save()
            return ctx.replyT('error', 'events:channel-not-found')
          }

          channel.createMessage(embed.build())
        }
      })
    } catch {
      await ctx.replyT('error', 'basic:punishment.error')
    }
  }
}
