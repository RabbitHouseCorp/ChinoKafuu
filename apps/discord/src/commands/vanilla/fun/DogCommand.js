import NekosLife from 'nekos.life'
import { Command, EmbedBuilder } from '../../../structures/util'
const NekoClient = new NekosLife()

export default class DogCommand extends Command {
  constructor() {
    super({
      name: 'dog',
      aliases: ['cachorro'],
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
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
