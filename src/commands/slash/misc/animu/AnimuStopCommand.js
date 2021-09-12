const { Command } = require('../../../../utils')

module.exports = class AnimuStopCommand extends Command {
  constructor() {
    super({
      name: 'animu leave',
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  async run(ctx) {
    await ctx.client.lavalink.manager.leave(ctx.message.guild.id)
    ctx.client.lavalink.manager.players.delete(ctx.message.guild.id)
    ctx.client.player.delete(ctx.message.guild.id)

    ctx.replyT('success', 'commands:animu.leaving')
  }
}
