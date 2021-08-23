const { Command, EmbedBuilder } = require('../../../utils')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class KickCommand extends Command {
  constructor() {
    super({
      name: 'kick',
      arguments: 1,
      aliases: ['expulsar'],
      hasUsage: true,
      permissions: [{
        entity: 'user',
        permissions: ['kickMembers']
      }, {
        entity: 'bot',
        permissions: ['kickMembers', 'embedLinks']
      }],
      slash: new CommandBase()
        .setName('kick')
        .setDescription('Kicks an user from the server')
        .addOptions(
          new CommandOptions()
            .setType(6)
            .setName('user')
            .setDescription('To kick user.')
            .isRequired(),
          new CommandOptions()
            .setType(3)
            .setName('reason')
            .setDescription('Reason fo the punishment')
        )
    })
  }

  async run(ctx) {
    const member = await ctx.getUser(ctx.message.command.interface.get('user').value?.id ?? ctx.message.command.interface.get('user').value)
    if (!member) return ctx.replyT('error', 'basic:invalidUser')

    const reason = ctx.message.command.interface.get('reason')?.value ?? ctx._locale('basic:noReason')
    if (reason.trim().length > 512) return ctx.reply('error', 'basic:punishment.bigReason')
    if (member.id === ctx.message.author.id) return ctx.replyT('error', 'commands:kick.selfKick')
    if (member.id === ctx.message.guild.ownerID) return ctx.replyT('error', 'commands:kick.ownerKick')

    const guildMember = await ctx.getMember(member.id)
    if (!guildMember) return ctx.replyT('error', 'basic:invalidUser')
    try {
      const embed = new EmbedBuilder()
      embed.setTitle(ctx._locale('basic:punishment.kicked', { member: `${member.username}#${member.discriminator}` }))
      embed.setColor('MODERATION')
      embed.setThumbnail(member.avatarURL)
      embed.addField(ctx._locale('basic:punishment.embed.memberName'), `${guildMember.user.username}#${guildMember.user.discriminator} (\`${guildMember.user.id}\`)`)
      embed.addField(ctx._locale('basic:punishment.embed.staffName'), `${ctx.message.author.username}#${ctx.message.author.discriminator} (\`${ctx.message.author.id}\`)`)
      embed.addField(ctx._locale('basic:punishment.embed.reason'), reason)
      guildMember.kick(reason).then(() => ctx.send(embed.build()))

      if (ctx.db.guild.punishModule) {
        await ctx.message.guild.channels.get(ctx.db.guild.punishChannel).createMessage({
          embed: embed
        })
      }
    } catch {
      return ctx.replyT('error', 'commands:kick.error')
    }
  }
}
