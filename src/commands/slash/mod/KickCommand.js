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
            .isRequired()
        )
    })
  }

  async run(ctx) {
    const member = await ctx.getUser(ctx.args[0])
    if (!member) return ctx.replyT('error', 'basic:invalidUser')

    const reason = ctx.args[1] ? ctx.args.slice(1).join(' ') : ctx._locale('basic:noReason')
    if (reason.trim().length > 512) return ctx.reply('error', 'basic:punishment.bigReason')
    if (member.id === ctx.message.author.id) return ctx.replyT('error', 'commands:kick.selfKick')
    if (member.id === ctx.message.guild.ownerID) return ctx.replyT('error', 'commands:kick.ownerKick')

    const guildMember = ctx.message.guild.members.get(member.id)
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
