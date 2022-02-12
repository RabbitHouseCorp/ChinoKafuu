const { Command, EmbedBuilder } = require('../../../structures/util')
const NekosLife = require('nekos.life')
const { CommandBase } = require('eris')
const NekoClient = new NekosLife()

module.exports = class DogCommand extends Command {
  constructor() {
    super({
      name: 'dog',
      aliases: ['cachorro'],
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }],
      slash: new CommandBase()
        .setName('dog')
        .setDescription('Sends an image or gif of a dog')
    })
  }

  async run(ctx) {
    const image = await NekoClient.sfw.woof()
    const embed = new EmbedBuilder()
    embed.setColor('ACTION')
    embed.setImage(image.url)
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
