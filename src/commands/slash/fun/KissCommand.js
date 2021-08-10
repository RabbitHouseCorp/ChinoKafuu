const { Command, EmbedBuilder } = require('../../../utils')
const { UsagiAPI } = require('usagiapi')
const {CommandBase, CommandOptions} = require("eris");
const usagi = new UsagiAPI()

module.exports = class KissCommand extends Command {
  constructor() {
    super({
      name: 'kiss',
      aliases: ['beijar'],
      arguments: 1,
      hasUsage: true,
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }],
      slash: new CommandBase()
          .setName('kiss')
          .setDescription('Kiss your true love (or not).')
          .addOptions(
              new CommandOptions()
                  .setType(6)
                  .setName('user')
                  .setDescription('Mention the member on the server')
                  .isRequired(),
          )
    })
  }

  async run(ctx) {
    const member = await ctx.getUser(ctx.message.command.interface.get('user').value.id)
    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    if (ctx.message.member.id === member.id) return ctx.replyT(':error:', 'commands:kiss.unable')
    const img = await usagi.get({ endpoint: 'kiss' })
    const embed = new EmbedBuilder()
    embed.setColor('ACTION')
    embed.setDescription(ctx._locale('commands:kiss.kissed', { author: ctx.message.member.mention, member: member.mention }))
    embed.setImage(img)
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
