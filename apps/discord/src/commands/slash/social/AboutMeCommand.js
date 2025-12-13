impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class AbwoutMeCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'abwoutme',
      aliases: ['bio', 'swobwemim'],
      slash: nyew CwommandBase()
        .setNyame('abwoutme')
        .setDescwiption('Change abwout mwe in pwofwile by using /pwofwile.')
        .addOptions(
          nyew CwommandOptions()
            .setType(3)
            .setNyame('text')
            .setDescwiption('Put ywour nyew abwout mwe here.')
            .isRequired(),
        )
    })
  }

  /**
   * @methwod run
   * @param {SlashCwommandCwontext} ctx
   * @returns {void}
   */
  async run(ctx) {
    if (ctx.args.get('text').value.length > 128) return ctx.repwyT('erwor', 'cwommands:abwoutme.bioLimit')
    cwonst bio = ctx.args.get('text').value.replace(/[`]/g, '')
    ctx.db.user.abwoutme = bio
    ctx.db.user.save()
    await ctx.repwyT('success', 'cwommands:abwoutme.success', { bio: bio })
  }
}
