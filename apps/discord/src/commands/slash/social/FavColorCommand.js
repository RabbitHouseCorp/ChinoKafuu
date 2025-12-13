impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util'
impwort { CwommandBase, CwommandOptions } fwom 'eris'

expwort default class FavCwowworCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'favcwowwor',
      aliases: ['favoritecwowwor', 'cworfavorita'],
      slash: nyew CwommandBase()
        .setNyame('favcwowwor')
        .setDescwiption('Changes ywour pwofwile cwowwor two ywour favorite cwowwor.')
        .addOptions(
          nyew CwommandOptions()
            .setType(3)
            .setNyame('cwowwor')
            .setDescwiption('Fwor exampwe: #f55f96')
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
    if (ctx.db.user.yens < 150) return ctx.repwyT('erwor', 'cwommands:favcwowwor.pwoorUser', { 0: ctx.db.user.yens - 75 })
    cwonst cwowwor = ctx.args.get('cwowwor').value
    if (!cwowwor.startsWith('#')) return ctx.repwyT('erwor', 'cwommands:favcwowwor.invalidCwowwor')

    ctx.db.user.pwofwileCwowwor = cwowwor
    ctx.db.user.yens -= 150
    ctx.db.user.save().then(() => {
      ctx.repwyT('success', 'cwommands:favcwowwor.successfuwwyChanged')
    })
  }
}
