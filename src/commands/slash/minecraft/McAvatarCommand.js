const { Command, EmbedBuilder, Emoji } = require('../../../utils')
const {CommandBase, CommandOptions} = require("eris");

module.exports = class McAvatarCommand extends Command {
  constructor() {
    super({
      name: 'mc avatar',
      aliases: [],
      arguments: 1,
      hasUsage: false,
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  async run(ctx) {
    const body = `https://mc-heads.net/avatar/${ctx.interactionMessage.command.interface.get('minecraft-nickname').value}/256.png`
    const embed = new EmbedBuilder()
    embed.setColor('MINECRAFT')
    embed.setImage(body)
    embed.setDescription(`${Emoji.getEmoji('minecraft').mention} [[Download]](${body})`)
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()
    ctx.send(embed.build())
  }
}
