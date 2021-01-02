const { Command, EmbedBuilder } = require('../../utils')
const NekosLife = require('nekos.life')
const NekoClient = new NekosLife()

class KissCommand extends Command {
  constructor() {
    super({
      name: 'kiss',
      aliases: ['beijar'],
      arguments: 1,
      hasUsage: true,
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  async run(ctx) {
    const member = ctx.message.mentions[0] || ctx.client.users.get(ctx.args[0])
    if (ctx.message.author.id === member.id) return ctx.replyT(':error:', 'commands:kiss.unable')
    const img = await NekoClient.sfw.kiss()
    const embed = new EmbedBuilder()
    embed.setColor('ACTION')
    embed.setDescription(ctx._locale('commands:kiss.kissed', { author: ctx.message.author.mention, member: member.mention }))
    embed.setImage(img.url)
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}

module.exports = KissCommand
