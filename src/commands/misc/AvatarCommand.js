// FUTURE[epic=KafuuTeam] Overlap

const { Command, EmbedBuilder } = require('../../utils')

module.exports = class AvatarCommand extends Command {
  constructor () {
    super({
      name: 'avatar',
      permissions: [{
        entity: 'bot',
        overlaps: true,
        permissions: ['embedLinks']
      }]
    })
  }

  async run (ctx) {
    const member = await ctx.getUser(ctx.args[0], true)
    const embed = new EmbedBuilder()
    embed.setTitle(ctx._locale('commands:avatar.userAvatar', { user: member.username }))
    embed.setDescription(ctx._locale('commands:avatar.download', { link: member.avatarURL }))
    embed.setImage(member.avatarURL)
    embed.setColor('DEFAULT')
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
