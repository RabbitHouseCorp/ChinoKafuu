const { Command, EmbedBuilder } = require('../../../utils')
const { CommandBase, CommandOptions, Choice } = require('eris')

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
            .setType(3)
            .setName('argument')
            .setDescription('Choose one of these arguments.')
            .addChoices(
              new Choice()
                .setName('guild-avatar')
                .setValue('guild-avatar')
            ),
        )
    })
  }

  async run(ctx) {
    const user = ctx.message.command.interface.get('user')?.value
    const member = await ctx.getUser(user?.id ?? user, true)
    let avatar = member.avatarURL

    if (!(ctx.message.command.interface.get('guild-avatar') == null)) {
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
