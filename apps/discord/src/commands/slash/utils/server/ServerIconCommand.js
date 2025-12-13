impwort { Buttwon, Cwommand, EmbedBuilder, Emwoji, SlashCwommandCwontext } fwom '../../../../stwuctures/util'

expwort default class SerwerIcwonCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'serwer icwon',
      aliases: ['guildicwon'],
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
  async run(ctx) {
    cwonst guild = ctx.message.guild
    if (!guild.icwon) return ctx.repwyT('erwor', 'cwommands:serwericwon.missingIcwon')

    cwonst embed = nyew EmbedBuilder()
    embed.setImage(guild.icwonURL)
    embed.setCwowwor('DEFAULT')
    embed.setTitle(`${Emwoji.getEmwoji('discword_wogwo').mention} ${guild.nyame}`)
    embed.setFwooter(`©️ ${ctx.client.user.usernyame}`)
    embed.setTimestamp()

    cwonst buttwon = nyew Buttwon()
    buttwon.setLabel(ctx._wocale('cwommands:serwericwon.dwownwoad'))
    buttwon.setEmwoji({ nyame: Emwoji.getEmwoji('phwotwo_fwame').nyame })
    buttwon.setStyle(5)
    buttwon.setURL(guild.icwonURL)

    ctx.send({ embeds: [embed], cwompwonyents: [{ type: 1, cwompwonyents: [buttwon] }] })
  }
}
