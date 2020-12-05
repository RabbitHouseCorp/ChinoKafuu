const Command = require('../../structures/command/Command')
const NekosLife = require('nekos.life')
const NekoClient = new NekosLife()
const { EmbedBuilder } = require('../../utils')

module.exports = class FeedCommand extends Command {
  constructor() {
    super({
      name: 'feed',
      aliases: ['alimentar'],
      arguments: 1
    })
  }

  async run(ctx) {
    const member = ctx.message.mentions[0] || ctx.client.users.get(ctx.args[0])
    const image = await NekoClient.sfw.feed()
    const embed = new EmbedBuilder()
      .setColor('ACTION')
      .setImage(image.url)
      .setDescription(ctx._locale('commands:feed.feed', { author: ctx.message.author.mention, user: member.mention }))
    ctx.send(embed)
  }
}
