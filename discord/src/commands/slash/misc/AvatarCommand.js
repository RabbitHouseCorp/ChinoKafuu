const { Command, EmbedBuilder, Button, Emoji } = require('../../../structures/util')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class AvatarCommand extends Command {
  constructor() {
    super({
      name: 'avatar',
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }],
      slash: new CommandBase()
        .setName('avatar')
        .setDescription('Shows your avatar or someone else\'s.')
        .addOptions(
          new CommandOptions()
            .setType(6)
            .setName('user')
            .setDescription('Mention the member on the server.'),
          new CommandOptions()
            .setType(5)
            .setName('guild-avatar')
            .setDescription('Shows the guild avatar of the member.')
        )
    })
  }

  async run(ctx) {
    const member = await ctx.getUser(ctx.args.get('user')?.value?.id ?? ctx.args.get('user')?.value, true)
    let avatar = member.avatarURL
    const download = new Button()
    download.setStyle(5)
    download.setURL(avatar)
    download.setLabel(ctx._locale('commands:avatar.download'))
    download.setEmoji({ name: Emoji.getEmoji('photo_frame').name })

    if (ctx.args.get('argument')?.value) {
      const guildMember = await ctx.getMember(member.id)
      avatar = guildMember?.guildAvatar ?? member.avatarURL
    }
    const embed = new EmbedBuilder()
    embed.setTitle(`${Emoji.getEmoji('photo_frame').mention} ${ctx._locale('commands:avatar.userAvatar', { user: member.username })}`)
    embed.setImage(avatar)
    embed.setColor('DEFAULT')
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()

    ctx.send({ embeds: [embed], components: [{ type: 1, components: [download.build()] }] })
  }
}
