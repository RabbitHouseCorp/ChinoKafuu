const Command = require('../../structures/command/Command')
const NekosLife = require('nekos.life')
const NekoClient = new NekosLife()
const { EmbedBuilder } = require('../../utils')

module.exports = class BakaCommand extends Command {
  constructor() {
    super({
      name: 'baka',
      arguments: 1
    })
  }

  async run(ctx) {
    const member = ctx.message.mentions[0] || ctx.client.users.get(ctx.args[0])
    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    const image = await NekoClient.sfw.baka()
    const embed = new EmbedBuilder()
      .setColor('ACTION')
      .setDescription(ctx._locale('commands:baka.baka', { author: ctx.message.author.mention, member: member.mention }))
      .setImage(image.url)
    ctx.send(embed)
  }
}

