const { Command, EmbedBuilder } = require('../../../utils')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class BanCommand extends Command {
  constructor() {
    super({
      name: 'ban',
      aliases: ['banir'],
      arguments: 1,
      hasUsage: true,
      permissions: [{
        entity: 'both',
        permissions: ['banMembers', 'embedLinks']
      }],
      slash: new CommandBase()
        .setName('ban')
        .setDescription('Bans a user from the server')
        .addOptions(
          new CommandOptions()
            .setType(6)
            .setName('user')
            .setDescription('To ban user.')
            .isRequired(),
          new CommandOptions()
            .setType(3)
            .setName('reason')
            .setDescription('Enter reason to ban user.'),
          new CommandOptions()
            .setType(4)
            .setName('message_days')
            .setDescription('Bans user with an optional timeframe.')
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
    let quantity = ctx.args.get('message_days')?.value
    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    if (guildMember) {
      if (member.id === ctx.message.member.id) return ctx.replyT('error', 'commands:ban.selfBan')
      if (member.id === ctx.message.guild.ownerID) return ctx.replyT('error', 'commands:ban.ownerBan')
    }
    if (reason.trim().length > 512) return ctx.reply('error', 'basic:punishment.bigReason')
    if (!quantity || quantity < 0 || quantity === Infinity || isNaN(quantity)) quantity = 0
    try {
      ctx.client.banGuildMember(ctx.message.guild.id, member.id, quantity, reason).then(() => {
        const embed = new EmbedBuilder()
        embed.setColor('MODERATION')
        embed.setThumbnail(member.avatarURL)
        embed.setTitle(ctx._locale('basic:punishment.banned', { 0: `${member.username}#${member.discriminator}` }))
        embed.addField(ctx._locale('basic:punishment.embed.memberName'), `${member.username}#${member.discriminator} (\`${member.id}\`)`)
        embed.addField(ctx._locale('basic:punishment.embed.staffName'), `${ctx.message.member.username}#${ctx.message.member.discriminator} (\`${ctx.message.member.id}\`)`)
        embed.addField(ctx._locale('basic:punishment.embed.reason'), ctx.args.get('reason').value)

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
      await ctx.replyT('error', 'commands:ban.error')
    }
  }
}
