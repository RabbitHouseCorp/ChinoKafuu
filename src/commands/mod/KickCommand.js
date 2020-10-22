const Command = require('../../structures/command/Command')
const EmbedBuilder = require('../../structures/util/EmbedBuilder')

module.exports = class KickCommand extends Command {
  constructor() {
    super({
      name: 'kick',
      arguments: 1,
      aliases: ['expulsar'],
      permissions: [{
        entity: 'user',
        permissions: ['kickMembers']
      }, {
        entity: 'bot',
        permissions: ['kickMembers', 'embedLinks']
      }]
    })
  }

  async run(ctx) {
    const member = ctx.message.mentions[0] || ctx.client.users.get(ctx.args[0])
    const reason = ctx.args.slice(1)?.join(' ') || ctx.t('basic:noReason')

    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    if (member.id === ctx.message.author.id) return ctx.replyT('error', 'commands:kick.selfKick')
    if (member.id === ctx.message.channel.guild.ownerID) return ctx.replyT('error', 'commands:kick.ownerKick')

    const guildMember = ctx.message.channel.guild.members.get(member.id)

    try {
      const embed = new EmbedBuilder()
        .setTitle(ctx.t('basic:punishment.kicked', { member: `${member.username}#${member.discriminator}` }))
        .setColor('MODERATION')
        .setThumbnail(member.avatarURL)
        .addField(ctx.t('basic:punishment.embed.memberName'), member.username, true)
        .addField(ctx.t('basic:punishment.embed.memberID'), member.id, true)
        .addField(ctx.t('basic:punishment.embed.staffName'), ctx.message.author.username, true)
        .addField(ctx.t('basic:punishment.embed.reason'), reason, true)
      guildMember.kick(reason).then(() => ctx.send(embed))

      if (ctx.db.guild.punishModule) {
        await ctx.message.channel.guild.channels.get(ctx.db.guild.punishChannel).createMessage({
          embed: embed
        })
      }
    } catch (e) {
      return ctx.replyT('error', 'commands:kick.error')
    }
  }
}
