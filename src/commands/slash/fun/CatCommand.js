const { Command, EmbedBuilder } = require('../../../utils')
const NekosLife = require('nekos.life')
const { CommandBase, CommandOptions } = require('eris')
const NekoClient = new NekosLife()

module.exports = class CatCommand extends Command {
  constructor() {
    super({
      name: 'cat',
      aliases: ['gato', 'kitty'],
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }],
      slash: new CommandBase()
        .setName('cat')
        .setDescription('Sends an image or gif of a cat')
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
