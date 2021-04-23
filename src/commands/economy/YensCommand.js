
const { Command } = require('../../utils')

module.exports = class YensCommand extends Command {
  constructor () {
    super({
      name: 'yens',
      aliases: ['yen'],
      overlaps: true
    })
  }

  async run (ctx) {
    const member = await ctx.getUser(ctx.args[0])
    if (!member) {
      const yens = Number(ctx.db.user.yens).toLocaleString()
      await ctx.replyT('yen', 'commands:yens.yens', { yens: `\`${yens}\`` })
      return
    }

    const userData = await ctx.db.db.getOrCreate(member.id)
    const yens = Number(userData.yens).toLocaleString()
    return ctx.replyT('yen', 'commands:yens.onMention', { user: member.mention, yens: `\`${yens}\`` })
  }
}
