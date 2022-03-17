const { Command, EmbedBuilder } = require('../../../structures/util')
const { UsagiAPI } = require('usagiapi')
const { CommandBase, CommandOptions } = require('eris')
const usagi = new UsagiAPI()

module.exports = class FeedCommand extends Command {
  constructor() {
    super({
      name: 'feed',
      aliases: ['alimentar'],
      arguments: 1,
      hasUsage: true,
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }],
      slash: new CommandBase()
        .setName('feed')
        .setDescription('Feeds a user')
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
    const image = await usagi.get({ endpoint: 'feed' })
    const embed = new EmbedBuilder()
    embed.setColor('ACTION')
    embed.setImage(image)
    embed.setDescription(ctx._locale('commands:feed.feed', { author: ctx.message.member.mention, user: member.mention }))
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
