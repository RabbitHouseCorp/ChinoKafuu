const { Command } = require('../../utils')

module.exports = class ClearCommand extends Command {
  constructor () {
    super({
      name: 'clear',
      aliases: ['limpar'],
      arguments: 1,
      hasUsage: true,
      permissions: [{
        entity: 'both',
        permissions: ['manageMessages', 'readMessageHistory', 'readMessages']
      }]
    })
  }

  async run (ctx) {
    if (ctx.args[0] > 100) return ctx.replyT('error', 'commands:clear.limit')
    if (isNaN(ctx.args[0])) return ctx.replyT('error', 'commands:clear.nan')

    ctx.message.channel.purge(Number(ctx.args[0]) + 1).then((msg) => {
      ctx.replyT('success', 'commands:clear.success', { messages: msg })
    })
  }

  // TODO Clear messages by user
}
