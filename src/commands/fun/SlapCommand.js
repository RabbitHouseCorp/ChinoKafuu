
const { Command, EmbedBuilder } = require('../../utils')
const { UsagiAPI } = require('usagiapi')
const usagi = new UsagiAPI()

module.exports = class SlapCommand extends Command {
  constructor () {
    super({
      name: 'slap',
      aliases: ['tapa'],
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
    const img = await usagi.slap()
    const embed = new EmbedBuilder()
    embed.setColor('ACTION')
    embed.setDescription(ctx._locale('commands:slap.slaped', { 0: ctx.message.author.mention, 1: member.mention }))
    embed.setImage(img.url)
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
