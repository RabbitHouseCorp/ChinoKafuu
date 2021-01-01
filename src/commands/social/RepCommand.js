const { Command } = require('../../utils')
const moment = require('moment')
require('moment-duration-format')

module.exports = class RepCommand extends Command {
    constructor() {
        super({
            name: 'reputation',
            aliases: ['rep', 'reputação', 'reputacao'],
            arguments: 1
        })
    }

    async run(ctx) {
        const member = ctx.client.users.get(ctx.args[0]?.replace(/[<@!>]/g, ''))
        if (!member) return ctx.replyT('error', 'basic:invalidUser')
        let author = ctx.db.user
        let user = await ctx.client.database.users.getOrCreate(member.id)
        if (member.id === ctx.message.author.id) return ctx.replyT('error', 'commands:reputation.cannotGiveRepForYourself')
        if (member.id === ctx.client.user.id) {
            user.rep += 1
            user.save().then(() => {
                ctx.replyT('chino_maid', 'commands:reputation.forTheClient', { 0: user.rep })
            })

            return
        }
        let time = (parseInt(author.repTime) - Date.now() > 3600000) ? moment.utc(parseInt(author.time - Date.now())).format('hh:mm:ss') : moment.utc(parseInt(author.repTime - Date.now())).format('mm:ss')
        if (parseInt(author.repTime) < Date.now()) {
            author.repTime = 3600000 + Date.now()
            user.rep += 1
            author.save()
            user.save().then(() => {
                ctx.replyT('success', 'commands:reputation.successffully', { 0: member.mention, 1: user.rep })
            })   
        } else {
            ctx.replyT('warn', 'commands:reputation.cooldown', { 0: time })
        }
    }
}