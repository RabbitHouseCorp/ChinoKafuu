const { Command } = require('../../../../structures/util')

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
    if (parseInt(ctx.args.get('value').value) > 100) return ctx.replyT('error', 'basic:voice.maxVolume')
    if (parseInt(ctx.args.get('value').value) < 5) return ctx.replyT('error', 'basic:voice.minVolume')

    ctx.client.player.get(ctx.message.guild.id).setVolume(ctx.args.get('value').value)
    ctx.replyT('success', 'commands:animu.volumeChanged')
  }
}
