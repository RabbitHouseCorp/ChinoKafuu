const { Command } = require('../../../utils')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class RenameChannelCommand extends Command {
  constructor() {
    super({
      name: 'renamechannel',
      aliases: ['renomearcanal'],
      hasUsage: true,
      permissions: [{
        entity: 'both',
        permissions: ['manageChannels']
      }],
      arguments: 1,
      slash: new CommandBase()
        .setName('rename')
        .setDescription('Renames a channel in the current guild.')
        .addOptions(
          new CommandOptions()
            .setType(1)
            .setName('emoji')
            .setDescription('Renames a channel in the current guild.')
            .addOptions(
              new CommandOptions()
                .setType(3)
                .setName('input')
                .setDescription('Enter the emoji you are adding to the server.')
                .isRequired()
            ),
          new CommandOptions()
            .setType(1)
            .setName('role')
            .setDescription('Removes a role from a guild member.')
            .addOptions(
              new CommandOptions()
                .setType(7)
                .setName('channel')
                .setDescription('Mention member on server.')
                .isRequired(),
              new CommandOptions()
                .setType(3)
                .setName('new-name')
                .setDescription('New name for the channel.')
                .isRequired()
            ),
        )
    })
  }

  run(ctx) {
    const guild = ctx.message.guild
    const channel = guild.channels.get(ctx.args[0].replace(/[<#>]/g, ''))
    const name = ctx.args.slice(1).join(' ').replace('&', '＆').replace('|', '│')
    if (!channel) return ctx.replyT('error', 'commands:renamechannel.channelNotFound')
    if (!name) return ctx.replyT('error', 'commands:renamechannel.invalidName')
    channel.edit({
      name
    }).then((channel) => {
      ctx.replyT('success', 'commands:renamechannel.successfullyRenamed', { 0: channel.name })
    })
  }
}
