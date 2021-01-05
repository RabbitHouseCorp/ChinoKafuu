const { Command } = require('../../utils')

module.exports = class AfkCommand extends Command {
    constructor() {
        super({
            name: 'afk',
            aliases: ['awayfromthekeyboard'],
            hasUsage: true
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
