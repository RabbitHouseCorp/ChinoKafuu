// FIXME[epic=KafuuTeam] Accept no-args

const { Command, EmbedBuilder } = require('../../utils')
const NekosLife = require('nekos.life')
const NekoClient = new NekosLife()

module.exports = class BakaCommand extends Command {
  constructor () {
    super({
      name: 'baka',
      arguments: 1,
      hasUsage: true,
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  async run (ctx) {
    const member = await ctx.getUser(ctx.args[0])
    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    const image = await NekoClient.sfw.baka()
    const embed = new EmbedBuilder()
    embed.setColor('ACTION')
    embed.setDescription(ctx._locale('commands:baka.baka', { author: ctx.message.author.mention, member: member.mention }))
    embed.setImage(image.url)
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
