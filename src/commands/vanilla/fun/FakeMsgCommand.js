const { Command } = require('../../../utils')

module.exports = class FakeMsgCommand extends Command {
  constructor() {
    super({
      name: 'fakemsg',
      aliases: [],
      arguments: 2,
      hasUsage: true,
      permissions: [{
        entity: 'bot',
        permissions: ['manageChannels','manageWebhooks']
      }]
    })
  }

  async run(ctx) {
    const member = await ctx.getUser(ctx.args[0])
    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    const args = ctx.args.slice(1).join(' ')
    if (!args) return ctx.replyT('error', 'commands:fakemsg.argsNull')
    let webhook = await ctx.message.channel.getWebhooks()
    webhook = webhook.filter(webhook => webhook.name === 'Fake Message')[0]
    if (!webhook || webhook.user.id !== ctx.client.user.id) {
      webhook = await ctx.message.channel.createWebhook({
        name: 'Fake Message',
        options: {
          type: 1
        }
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
