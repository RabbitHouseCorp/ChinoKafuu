const { Command, EmbedBuilder } = require('../../../structures/util')
const { UsagiAPI } = require('usagiapi')
const { CommandBase, CommandOptions } = require('eris')
const usagi = new UsagiAPI()

module.exports = class SlapCommand extends Command {
  constructor() {
    super({
      name: 'slap',
      aliases: ['tapa'],
      arguments: 1,
      hasUsage: true,
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }],
      slash: new CommandBase()
        .setName('slap')
        .setDescription('Slap someone on your server.')
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
    const member = await ctx.getUser(ctx.args.get('user').value?.id ?? ctx.args.get('user').value)
    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    const img = await usagi.get({ endpoint: 'slap' })
    const embed = new EmbedBuilder()
    embed.setColor('ACTION')
    embed.setDescription(ctx._locale('commands:slap.slaped', { 0: ctx.message.member.mention, 1: member.mention }))
    embed.setImage(img)
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
