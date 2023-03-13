import { Command, SlashCommandContext } from '../../../../structures/util'

export default class AnimuStopCommand extends Command {
  constructor() {
    super({
      name: 'animu leave',
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  /**
  * @method run
  * @param {SlashCommandContext} ctx
  * @returns {void}
  */
  async run(ctx) {
    await ctx.client.lavalink.manager.leave(ctx.message.guild.id)
    ctx.client.lavalink.manager.players.delete(ctx.message.guild.id)
    ctx.client.player.delete(ctx.message.guild.id)

    ctx.replyT('success', 'commands:animu.leaving')
  }
}
