const { Command, EmbedBuilder } = require('../../../utils')
const { UsagiAPI } = require('usagiapi')
const { CommandBase, CommandOptions } = require('eris')
const usagi = new UsagiAPI()

module.exports = class PokeCommand extends Command {
  constructor() {
    super({
      name: 'poke',
      aliases: ['catucar'],
      arguments: 1,
      hasUsage: true,
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }],
      slash: new CommandBase()
        .setName('poke')
        .setDescription('Poke someone on your server.')
        .addOptions(
          new CommandOptions()
            .setType(6)
            .setName('user')
            .setDescription('Mention the member on the server')
            .isRequired()
        )
    })
  }

  async run(ctx) {
    const user = ctx.message.command.interface.get('user').value
    const member = await ctx.getUser(user?.id ?? user)
    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    const img = await usagi.get({ endpoint: 'poke' })
    const embed = new EmbedBuilder()
    embed.setColor('ACTION')
    embed.setDescription(ctx._locale('commands:poke.poked', { 0: ctx.message.member.mention, 1: member.mention }))
    embed.setImage(img)
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
