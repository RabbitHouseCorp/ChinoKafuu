const Command = require('../../structures/command/Command')
const NekosLife = require('nekos.life')
const NekoClient = new NekosLife()
const EmbedBuilder = require('../../structures/util/EmbedBuilder')

module.exports = class DogCommand extends Command {
  constructor() {
    super({
      name: 'dog',
      aliases: ['cachorro']
    })
  }

  async run(ctx) {
    const image = await NekoClient.sfw.woof()
    const embed = new EmbedBuilder()
      .setColor('ACTION')
      .setImage(image.url)
    ctx.send(embed)
  }
}
