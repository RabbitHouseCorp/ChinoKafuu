const { Command, Emoji } = require('../../../structures/util')

module.exports = class ClearCommand extends Command {
  constructor() {
    super({
      name: 'clear',
      aliases: ['limpar'],
      permissions: [{
        entity: 'both',
        permissions: ['manageMessages', 'readMessageHistory', 'viewChannel']
      }]
    })
  }

  async run(ctx) {
    if (ctx.args[0] > 100) return ctx.replyT('error', 'commands:clear.limit')
    if (isNaN(ctx.args[0])) return ctx.replyT('error', 'commands:clear.nan')
    const user = await ctx.getUser(ctx.args.slice(1).join(' '))
    const filter = user ? ((msg) => msg.author.id === user?.id) : null
    ctx.message.channel.purge(Number(ctx.args[0]), filter).then((msg) => {
      ctx.message.channel.createMessage(`${Emoji.getEmoji('success').mention} **|** ${ctx.message.author.mention}, ${ctx._locale('commands:clear.success', { messages: msg })}`)
    })
  }
}
