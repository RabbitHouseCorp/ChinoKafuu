const { Command } = require('../../../utils')
const {CommandBase, CommandOptions, Choice} = require("eris");

module.exports = class ChatCommand extends Command {
  constructor() {
    super({
      name: 'chat',
      arguments: 1,
      hasUsage: true,
      permissions: [{
        entity: 'both',
        permissions: ['manageChannels']
      }],
      slash: new CommandBase()
          .setName('chat')
          .setDescription('Locks the chat, updating the `Send Messages` permissions for the `@everyone` role')
          .addOptions(
              new CommandOptions()
                  .setType(3)
                  .setName('mode')
                  .setDescription('Locks the chat, updating the `Send Messages` permissions for the `@everyone` role')
                  .addChoices(
                      new Choice()
                          .setName('off')
                          .setValue('off'),
                      new Choice()
                          .setName('on')
                          .setValue('on'),
                  )
                  .isRequired()
          )
    })
  }

  async run(ctx) {
    const role = ctx.message.guild.roles.get(ctx.message.guild.id)
    if (ctx.args[0] === 'off') {
      return ctx.message.channel.editPermission(role.id, 0, 2048, 'role').then(ctx.replyT('success', 'commands:chat.locked'))
    }
    if (ctx.args[0] === 'on') {
      return ctx.message.channel.editPermission(role.id, 2048, 0, 'role').then(ctx.replyT('success', 'commands:chat.unlocked'))
    }
  }
}
