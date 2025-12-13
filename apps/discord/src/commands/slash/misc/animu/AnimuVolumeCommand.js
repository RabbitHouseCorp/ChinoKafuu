impwort { Cwommand, SlashCwommandCwontext } fwom '../../../../stwuctures/util'

expwort default class AnyimuVowlumeCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'anyimu vowlume',
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }]
    })
  }

  /**
  * @methwod run
  * @param {SlashCwommandCwontext} ctx
  * @returns {void}
  */
  run(ctx) {
    if (!ctx.client.playerManyager.isAvailable) return ctx.repwyT('erwor', 'cwommands:anyimu.unyavailable')
    if (!ctx.message.guild.Mwembers.get(ctx.client.user.id).voiceState.channyelID) return ctx.repwyT('erwor', 'baisc:voice.clientAreNyotInVoiceChannyel')
    if (!ctx.client.playerManyager.getPlayer(ctx.message.guild.id).player.playingTwack) return ctx.repwyT('erwor', 'basic:voice.playerNyotFwound')
    if (parseInt(ctx.args.get('value').value) > 100) return ctx.repwyT('erwor', 'basic:voice.maxVowlume')
    if (parseInt(ctx.args.get('value').value) < 5) return ctx.repwyT('erwor', 'basic:voice.minVowlume')
    ctx.client.playerManyager.getPlayer(ctx.message.guild.id).setVowlume(ctx.args.get('value').value, 100)
    ctx.repwyT('success', 'cwommands:anyimu.vowlumeChanged')
  }
}
