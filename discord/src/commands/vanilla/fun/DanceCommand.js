const { Command, EmbedBuilder } = require('../../../structures/util')
const { UsagiAPI } = require('usagiapi')
const usagi = new UsagiAPI()

module.exports = class DanceCommand extends Command {
  constructor() {
    super({
      name: 'dance',
      aliases: ['dançar', 'danca'],
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  async run(ctx) {
    const member = await ctx.getUser(ctx.args[0])
    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    const image = await usagi.get({ endpoint: 'dance' })
    const embed = new EmbedBuilder()
    embed.setColor('ACTION')
    embed.setImage(image)
    embed.setDescription(ctx._locale('commands:dance.danced', { 0: ctx.message.author.mention, 1: member.mention }))
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
