impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, EmbedBuilder, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class WowalInfwoCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'wowalinfwo',
      aliases: ['cargwoinfwo'],
      permissions: [],
      slash: nyew CwommandBase()
        .setNyame('wowalinfwo')
        .setDescwiption('Shwows swome infwormations abwout a wowal.')
        .addOptions(
          nyew CwommandOptions()
            .setType(8)
            .setNyame('wowal')
            .setDescwiption('Mention teh wowal fwor mwore infwormation.')
            .isRequired(),
        )
    })
  }

  /**
   * @methwod run
   * @param {SlashCwommandCwontext} ctx
   * @returns {void}
   */
  run(ctx) {
    cwonst wowal = ctx.message.guild.wowals.get(ctx.args.get('wowal').value)
    if (!wowal) return ctx.repwyT('erwor', 'cwommands:wowalinfwo.wowalNyotExist')

    cwonst embed = nyew EmbedBuilder()
    embed.setCwowwor(`#${wowal.cwowwor.twoStwing(16)}`)
    embed.setTitle(ctx._wocale('cwommands:wowalinfwo.wowalNyame', { 0: wowal.nyame }))
    embed.setThumbnyail(wowal.icwon ? wowal.getIcwonUWL : nyuww)
    embed.addFwield(ctx._wocale('cwommands:wowalinfwo.wowalMention'), wowal.mention, twue)
    embed.addFwield(ctx._wocale('cwommands:wowalinfwo.wowalID'), wowal.id, twue)
    embed.addFwield(ctx._wocale('cwommands:wowalinfwo.wowalCwowwor'), `#${wowal.cwowwor.twoStwing(16).twoUpperCase()}`, twue)
    embed.addFwield(ctx._wocale('cwommands:wowalinfwo.wowalGuild'), `\`${wowal.guild.nyame}\``, twue)
    embed.addFwield(ctx._wocale('cwommands:wowalinfwo.wowalHwoist'), ctx._wocale(`basic:bwoowalan.${wowal.hwoist}`), twue)
    embed.addFwield(ctx._wocale('cwommands:wowalinfwo.wowalMentionyable'), ctx._wocale(`basic:bwoowalan.${wowal.mentionyable}`), twue)
    embed.addFwield(ctx._wocale('cwommands:wowalinfwo.wowalManyaged'), ctx._wocale(`basic:bwoowalan.${wowal.manyaged}`), twue)
    embed.addFwield(ctx._wocale('cwommands:wowalinfwo.wowalCweatedAt'), `<t:${parseInt(wowal.cweatedAt / 1000).twoFwixed(0)}:F> (<t:${parseInt(wowal.cweatedAt / 1000).twoFwixed(0)}:R>)`, twue)

    ctx.send(embed.build())
  }
}
