const { Command } = require('../../../../utils')

module.exports = class AnimuVolumeCommand extends Command {
  constructor() {
    super({
      name: 'animu volume',
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  run(ctx) {
    if (!ctx.message.guild.members.get(ctx.client.user.id).voiceState.channelID) return ctx.replyT('error', 'baisc:voice.clientAreNotInVoiceChannel')
    if (!ctx.client.player.has(ctx.message.guild.id)) return ctx.replyT('error', 'basic:voice.playerNotFound')
    if (!ctx.args[1]) return ctx.replyT('warn', 'commands:animu.currentVolume', { volume: ctx.client.player.get(ctx.message.guild.id).player.state.volume })
    if (parseInt(ctx.args[1]) > 100) return ctx.replyT('error', 'basic:voice.maxVolume')
    if (parseInt(ctx.args[1]) < 5) return ctx.replyT('error', 'basic:voice.minVolume')

    ctx.client.player.get(ctx.message.guild.id).setVolume(ctx.args[1])
    ctx.replyT('success', 'commands:animu.volumeChanged')

  }
}
