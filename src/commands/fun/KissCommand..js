const Command = require('../../structures/command/Command')
const NekosLife = require('nekos.life')
const neko = new NekosLife()
const { EmbedBuilder } = require('../../utils')

class KissCommand extends Command {
  constructor() {
    super({
      name: 'kiss',
      aliases: ['beijar'],
      arguments: 1,
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  async run(ctx) {
    const member = ctx.message.mentions[0] || ctx.client.users.get(ctx.args[0])
    if (ctx.message.author.id === member.id) return ctx.replyT(':error:', 'commands:kiss.unable')
    const img = await neko.sfw.kiss()
    const embed = new EmbedBuilder()
      .setColor('ACTION')
      .setDescription(ctx.t('commands:kiss.kissed', { author: ctx.message.author.mention, member: member.mention }))
      .setImage(img.url)
    ctx.send(embed)
  }
}

module.exports = KissCommand
