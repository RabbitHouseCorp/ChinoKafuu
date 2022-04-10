const { Command } = require('../../../structures/util')

module.exports = class RenameChannelCommand extends Command {
  constructor() {
    super({
      name: 'renamechannel',
      aliases: ['renomearcanal'],
      permissions: [{
        entity: 'both',
        permissions: ['manageChannels']
      }]
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
