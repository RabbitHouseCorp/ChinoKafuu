const { Command } = require('../../../utils')
const {CommandBase, CommandOptions} = require("eris");

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
      }],
      slash: new CommandBase()
          .setName('fakemsg')
          .setDescription('Prank on someone with a fake message through webhook.')
          .addOptions(
              new CommandOptions()
                  .setType(6)
                  .setName('user')
                  .setDescription('Mention the member on the server')
                  .isRequired(),
              new CommandOptions()
                  .setType(3)
                  .setName('text')
                  .setDescription('Enter random text')
                  .isRequired(),
          )
    })
  }

  async run(ctx) {
    const member = await ctx.getUser(ctx.message.command.interface.get('user').value.id)
    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    const args = ctx.message.command.interface.get('text').value
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
