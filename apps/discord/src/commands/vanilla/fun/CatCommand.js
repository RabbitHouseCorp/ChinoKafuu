import { Command, EmbedBuilder } from '../../../structures/util'
import NekosLife from 'nekos.life'
const NekoClient = new NekosLife()

export default class CatCommand extends Command {
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
