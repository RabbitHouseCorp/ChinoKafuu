const { Command, EmbedBuilder } = require('../../../structures/util')

module.exports = class AvatarCommand extends Command {
  constructor() {
    super({
      name: 'avatar',
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  async run(ctx) {
    const member = await ctx.getUser(ctx.args[0], true)
    let avatar = member.avatarURL
    if (ctx.args.includes('--guild')) {
      avatar = ctx.message.guild.members.get(member.id)?.guildAvatar ?? member.avatarURL
    }
    const embed = new EmbedBuilder()
    embed.setTitle(ctx._locale('commands:avatar.userAvatar', { user: member.username }))
    embed.setDescription(ctx._locale('commands:avatar.download', { link: avatar }))
    embed.setImage(avatar)
    embed.setColor('DEFAULT')
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
