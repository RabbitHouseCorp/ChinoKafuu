const { Command, EmbedBuilder, Emoji } = require('../../../structures/util')

module.exports = class McSkinCommand extends Command {
  constructor() {
    super({
      name: 'mcskin',
      aliases: [],
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  async run(ctx) {
    const body = `https://minotar.net/skin/${ctx.args[0]}`
    const embed = new EmbedBuilder()
    embed.setColor('MINECRAFT')
    embed.setImage(body)
    embed.setDescription(`${Emoji.getEmoji('minecraft').mention} [[Download]](${body})`)
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
