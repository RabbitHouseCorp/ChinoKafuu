const { Command } = require('../../utils')

module.exports = class AboutMeCommand extends Command {
    constructor() {
        super({
            name: 'aboutme',
            aliases: ['bio', 'sobremim'],
            arguments: 1,
            hasUsage: true
        })
    }

    async run(ctx) {
        if (ctx.args.join(' ') > 128) return ctx.replyT('error', 'commands:aboutme.bioLimit')
        const bio = ctx.args.join(' ').replace(/[`]/g, '')
        ctx.db.user.aboutme = bio
        ctx.db.user.save()
        await ctx.replyT('success', 'commands:aboutme.success', { bio: bio })
    }
}
