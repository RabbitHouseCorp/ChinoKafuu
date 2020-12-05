const { Command, EmbedBuilder } = require('../../utils')
const NekosLife = require('nekos.life')
const NekoClient = new NekosLife()

module.exports = class BakaCommand extends Command {
  constructor() {
    super({
      name: 'cat',
      aliases: ['gato', 'kitty']
    })
  }

  async run(ctx) {
    const image = await NekoClient.sfw.meow()
    const embed = new EmbedBuilder()
    embed.setColor('ACTION')
    embed.setImage(image.url)
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()

    ctx.send(embed)
  }
}

