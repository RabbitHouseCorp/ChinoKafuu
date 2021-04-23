const { Command } = require('../../utils')

module.exports = class ChatCommand extends Command {
  constructor() {
    super({
      name: 'chat',
      arguments: 1,
      hasUsage: true,
      permissions: [{
        entity: 'both',
        permissions: ['manageChannels']
      }]
    })
  }

  async run(ctx) {
    const role = ctx.message.channel.guild.roles.get(ctx.message.channel.guild.id)
    if (ctx.args[0] === 'off') {
      return ctx.message.channel.editPermission(role.id, 0, 2048, 'role').then(ctx.replyT('success', 'commands:chat.locked'))
    }
    if (ctx.args[0] === 'on') {
      return ctx.message.channel.editPermission(role.id, 2048, 0, 'role').then(ctx.replyT('success', 'commands:chat.unlocked'))
    }
  }
}
