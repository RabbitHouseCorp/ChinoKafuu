const { Command, FunCommandInstance, Emoji } = require('../../utils')
module.exports = class FakeMsgCommand extends Command {
    constructor() {
        super({
            name: 'fakemsg',
            aliases: [],
            arguments: 2,
            hasUsage: true,
            permissions: [{
                entity: 'bot',
                permissions: ['manageWebhooks']
            }]
        })
    }

    async run(ctx) {
        const member = ctx.client.users.get(ctx.args[0]?.replace(/[<@!>]/g, ''))
        if (!member) return ctx.replyT('error', 'basic:invalidUser')
        const args = ctx.args.slice(1).join(' ')
        if (!args) return ctx.replyT('error', 'commands:fakemsg.argsNull')
        let webhook = await ctx.message.channel.getWebhooks()
        webhook = webhook.filter(webhook => webhook.name === 'Fake Message')[0]
        if (!webhook) {
            webhook = await ctx.message.channel.createWebhook({
                name: 'Fake Message',
            })
        }

        ctx.client.executeWebhook(webhook.id, webhook.token, {
            content: args,
            avatarURL: member.avatarURL,
            username: member.username,
            allowedMentions: {
                everyone: false,
                roles: false,
                users: true
            }
        })
        ctx.message.delete()
    }
}
