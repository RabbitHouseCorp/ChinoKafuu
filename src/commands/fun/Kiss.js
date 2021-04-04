//FUTURE[epic=KafuuTeam] Overlap

const { Command, EmbedBuilder } = require('../../utils')
const { UsagiAPI } = require('usagiapi')
const usagi = new UsagiAPI()

module.exports = class KissCommand extends Command {
  constructor () {
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

  async run (ctx) {
    const member = await ctx.getUser(ctx.args[0])
    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    if (ctx.message.author.id === member.id) return ctx.replyT(':error:', 'commands:kiss.unable')
    const img = await usagi.kiss()
    const embed = new EmbedBuilder()
    embed.setColor('ACTION')
    embed.setDescription(ctx._locale('commands:kiss.kissed', { author: ctx.message.author.mention, member: member.mention }))
    embed.setImage(img)
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
