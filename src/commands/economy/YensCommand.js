const { Command } = require('../../utils')

module.exports = class YensCommand extends Command {
  constructor() {
    super({
      name: 'yens',
      aliases: ['yen']
    })
  }

  async run(ctx) {
    const member = await ctx.getUser(ctx.args[0])
    if (!member) {
      const sugarcube = Number(ctx.db.user?.sugarcube ?? 0).toLocaleString()
      const yens = Number(ctx.db.user.yens).toLocaleString()
      await ctx.replyT('yen', 'commands:yens.yens', { yens: `\`${yens}\``, sugarcube: `\`${sugarcube}\`` })
      return
    }
   
    const userData = await ctx.db.db.getOrCreate(member.id)
    const yens = Number(userData.yens).toLocaleString()
    const sugarcube = Number(userData?.sugarcube ?? 0).toLocaleString()
    return ctx.replyT('yen', 'commands:yens.onMention', { user: member.mention, yens: `\`${yens}\``, sugarcube: `\`${sugarcube}\`` })
  }
}
