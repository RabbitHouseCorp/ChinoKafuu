const Command = require('../../structures/command/Command')

module.exports = class ClearCommand extends Command {
  constructor() {
    super({
      name: 'clear',
      aliases: ['limpar'],
      arguments: 1,
      permissions: [{
        entity: 'both',
        permissions: ['manageMessages']
      }]
    })
  }

  async run(ctx) {
    if (ctx.args[0] > 100) return ctx.replyT('error', 'commands:clear.limit')
    if (isNaN(ctx.args[0])) return ctx.replyT('error', 'commands:clear.nan')

    ctx.message.channel.purge(Number(ctx.args[0]) + 1).then(ctx.replyT('success', 'commands:clear.success', { messages: ctx.args[0] }))
  }

  //TODO Clear messages by user
}
