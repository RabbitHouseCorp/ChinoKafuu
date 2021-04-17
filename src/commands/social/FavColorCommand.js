// FUTURE[epic=KafuuTeam] Overlap

const { Command } = require('../../utils')

module.exports = class FavColorCommand extends Command {
  constructor () {
    super({
      name: 'favcolor',
      aliases: ['favoritecolor', 'corfavorita'],
      arguments: 1,
      overlaps: true,
      hasUsage: true
    })
  }

  async run (ctx) {
    if (ctx.db.user.yens < 150) return ctx.replyT('error', 'commands:favcolor.poorUser', { 0: ctx.db.user.yens - 75 })
    if (!ctx.args[0].startsWith('#')) return ctx.replyT('error', 'commands:favcolor.invalidColor')

    ctx.db.user.profileColor = ctx.args[0]
    ctx.db.user.yens -= 150
    ctx.db.user.save().then(() => {
      ctx.replyT('success', 'commands:favcolor.successfullyChanged')
    })
  }
}
