const { Command } = require('../../utils')
const moment = require('moment')
require('moment-duration-format')

module.exports = class RepCommand extends Command {
  constructor() {
    super({
      name: 'rep',
      aliases: ['reputation', 'reputação', 'reputacao'],
      arguments: 1,
      hasUsage: true
    })
  }

  async run(ctx) {
    const member = ctx.client.users.get(ctx.args[0]?.replace(/[<@!>]/g, ''))
    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    const author = ctx.db.user
    const user = await ctx.client.database.users.getOrCreate(member.id)
    if (member.id === ctx.message.author.id) return ctx.replyT('error', 'commands:rep.cannotGiveRepForYourself')
    if (member.id === ctx.client.user.id) {
      author.repTime = 3600000 + Date.now()
      user.rep += 1
      user.save().then(() => {
        ctx.replyT('chino_maid', 'commands:rep.forTheClient', { 0: user.rep })
      })
      author.save()

      return
    }
    const time = (parseInt(author.repTime) - Date.now() > 3600000) ? moment.utc(parseInt(author.time - Date.now())).format('hh:mm:ss') : moment.utc(parseInt(author.repTime - Date.now())).format('mm:ss')
    if (parseInt(author.repTime) < Date.now()) {
      author.repTime = 3600000 + Date.now()
      user.rep += 1
      author.save()
      user.save().then(() => {
        ctx.replyT('success', 'commands:rep.successffully', { 0: member.mention, 1: user.rep })
      })
    } else {
      ctx.replyT('warn', 'commands:rep.cooldown', { 0: time })
    }
  }
}
