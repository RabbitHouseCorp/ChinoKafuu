const { Command, EmbedBuilder } = require('../../../utils')
const { UsagiAPI } = require('usagiapi')
const { CommandBase, CommandOptions } = require('eris')
const usagi = new UsagiAPI()

module.exports = class HugCommand extends Command {
  constructor() {
    super({
      name: 'hug',
      aliases: ['abraçar', 'abracar'],
      arguments: 1,
      hasUsage: true,
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }],
      slash: new CommandBase()
        .setName('hug')
        .setDescription('Hug a friend and make them happy.')
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
    const img = await usagi.get({ endpoint: 'hug' })
    const embed = new EmbedBuilder()
    embed.setColor('ACTION')
    embed.setDescription(ctx._locale('commands:hug.huged', { 0: ctx.message.member.mention, 1: member.mention }))
    embed.setImage(img)
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
