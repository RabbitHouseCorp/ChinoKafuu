const { Command } = require('../../../utils')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class SetNickCommand extends Command {
  constructor() {
    super({
      name: 'setnick',
      aliases: ['changenick', 'updatenick', 'alterarnickname', 'setnickname'],
      arguments: 1,
      permissions: [{
        entity: 'both',
        permissions: ['manageNicknames']
      }],
      slash: new CommandBase()
        .setName('setnick')
        .setDescription('Sets the nickname of a member')
        .addOptions(
          new CommandOptions()
            .setType(6)
            .setName('user')
            .setDescription('Mention member on server.')
            .isRequired(),
          new CommandOptions()
            .setType(3)
            .setName('nickname')
            .setDescription('Add a new nickname.')
            .isRequired(),
        )
    })
  }

  async run(ctx) {
    const member = await ctx.getMember(ctx.message.command.interface.get('user').value?.id ?? ctx.message.command.interface.get('user').value)
    const newNick = ctx.message.command.interface.get('nickname').value
    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    try {
      await member.edit({
        nick: newNick
      })
      return ctx.replyT('success', 'commands:setnick.success', { member: member.username, nickname: newNick })
    } catch {
      return ctx.replyT('error', 'commands:setnick.error') // FIXME error being triggered with no reason
    }
  }
}
