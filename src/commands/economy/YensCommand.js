const { Command } = require('../../utils')

module.exports = class YensCommand extends Command {
    constructor() {
        super({
            name: 'yens',
            aliases: ['yen']
        })
    }

    async run(ctx) {
        const member = ctx.message.mentions[0] || ctx.client.users.get(ctx.args[0])
        if (member) {
            const userData = await ctx.db.db.getOrCreate(member.id)
            const yens = Number(userData.yens).toLocaleString()
            return ctx.replyT('yen', 'commands:yens.onMention', { user: member.mention, yens: `\`${yens}\`` })
        }
        const yens = Number(ctx.db.user.yens).toLocaleString()
        await ctx.replyT('yen', 'commands:yens.yens', { yens: `\`${yens}\`` })
    }
}
