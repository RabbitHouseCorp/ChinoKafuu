const Command = require('../../structures/command/Command')
const NekosLife = require('nekos.life')
const NekoClient = new NekosLife()
const EmbedBuilder = require('../../structures/util/EmbedBuilder')

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
      .setColor('ACTION')
      .setImage(image.url)
    ctx.send(embed)
  }
}

