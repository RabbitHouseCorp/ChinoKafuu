const { Command, EmbedBuilder } = require('../../../structures/util')
const NekosLife = require('nekos.life')
const NekoClient = new NekosLife()

module.exports = class CatCommand extends Command {
  constructor() {
    super({
      name: 'cat',
      aliases: ['gato', 'kitty'],
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  async run(ctx) {
    const image = await NekoClient.sfw.meow()
    const embed = new EmbedBuilder()
    embed.setColor('ACTION')
    embed.setImage(image.url)
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
