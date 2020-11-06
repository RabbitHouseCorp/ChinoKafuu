const Command = require('../../structures/command/Command')

module.exports = class AfkCommand extends Command {
  constructor() {
    super({
      name: 'afk'
    })
  }

  async run(ctx) {
    const member = ctx.db.user
    const reason = ctx.args.join(' ') ?? 'Unspecified'

    member.afk = true
    member.afkReason = reason
    member.save()
    return ctx.replyT('success', 'commands:afk.success')
  }
}
