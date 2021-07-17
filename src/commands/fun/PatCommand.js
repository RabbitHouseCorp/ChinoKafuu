const { Command, EmbedBuilder } = require('../../utils')
const { UsagiAPI } = require('usagiapi')
const usagi = new UsagiAPI()

module.exports = class PatCommand extends Command {
  constructor() {
    super({
      name: 'pat',
      aliases: ['cafune', 'cafuné'],
      arguments: 1,
      hasUsage: true,
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  async run(ctx) {
    const member = await ctx.getUser(ctx.args[0])
    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    const img = await usagi.get({ endpoint: 'pat' })
    const embed = new EmbedBuilder()
    embed.setColor('ACTION')
    embed.setDescription(ctx._locale('commands:pat.pated', { 0: ctx.message.author.mention, 1: member.mention }))
    embed.setImage(img)
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
