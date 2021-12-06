const { Command } = require('../../../utils')

module.exports = class StopNotifyCommand extends Command {
  constructor() {
    super({
      name: 'stopnotify',
      aliases: ['parardenotificar'],
    })
  }

  async run(ctx) {
    if (ctx.db.user.stopNotify) return ctx.replyT('error', 'events:stopnotify.alreadyStopped')
    ctx.db.user.stopNotify = true
    ctx.db.user.save().then(() => {
      ctx.replyT('success', 'events:stopnotify.stopNotifyRightNow')
    })
  }
}
