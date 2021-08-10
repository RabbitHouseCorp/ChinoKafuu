const { Command, EmbedBuilder } = require('../../../utils')
const NekosLife = require('nekos.life')
const {CommandBase, CommandOptions} = require("eris");
const NekoClient = new NekosLife()

module.exports = class BakaCommand extends Command {
  constructor() {
    super({
      name: 'baka',
      arguments: 1,
      hasUsage: true,
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }],
      slash: new CommandBase()
          .setName('baka')
          .setDescription('Calls a user baka')
          .addOptions(
              new CommandOptions()
                  .setType(6)
                  .setName('user')
                  .setDescription('Mention the member on the server'),
          )
    })
  }

  async run(ctx) {
    const member = await ctx.getUser(ctx.message.command.interface.get('user').value.id)
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
