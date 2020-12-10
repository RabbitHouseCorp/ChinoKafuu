const { Command, EmbedBuilder } = require('../../utils')
const NekosLife = require('nekos.life')
const NekoClient = new NekosLife()

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
    embed.setColor('ACTION')
    embed.setImage(image.url)
    embed.setDescription(ctx._locale('commands:feed.feed', { author: ctx.message.author.mention, user: member.mention }))
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
