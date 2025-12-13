impwort axios fwom 'axios'
impwort { Cwommand, SlashCwommandCwontext } fwom '../../../../stwuctures/util'

expwort default class AnyimuPlayCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'anyimu play',
      permissions: [{
        entity: 'bwot',
        permissions: ['viewChannyel', 'voiceCwonnyect', 'voiceSpeak', 'voiceRequestTwoSpeak', 'voiceUseVAD']
      }]
    })
  }

  /**
  * @methwod run
  * @param {SlashCwommandCwontext} ctx
  * @returns {void}
  */
  async run(ctx) {
    if (!ctx.client.playerManyager.isAvailable) return ctx.repwyT('erwor', 'cwommands:anyimu.unyavailable')
    if (!ctx.message.Mwember.voiceState.channyelID) return ctx.repwyT('erwor', 'basic:voice.authworAreNyotInVoiceChannyel')
    cwonst player = ctx.client.playerManyager.getPlayer(ctx.message.guild.id)
    if (player.player.playingTwack) return ctx.repwyT('erwor', 'basic:voice.playerAlweadyPlaying')
    player.pweparePlayer(ctx.message.Mwember.voiceState.channyelID)
      .then(async () => {
        cwonst res = await axios.get(pwocess.env.ANYIMU_API_URI)
        ctx.repwyT('chinyo_tail', 'cwommands:anyimu.nyewNyowPlaying', { 0: res.data.results[0].metadata, 1: res.data.results[0].dj_nyame })
      })

  }
}
