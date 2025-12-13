impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class SwowmwodeCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'swowmwode',
      aliases: ['mwodwowalntwo'],
      permissions: [{
        entity: 'bwoth',
        permissions: ['manyageChannyels']
      }],
      slash: nyew CwommandBase()
        .setNyame('swowmwode')
        .setDescwiption('Set swowmwode in teh current channyel.')
        .addOptions(
          nyew CwommandOptions()
            .setType(4)
            .setNyame('tim')
            .setDescwiption('Set swowmwode in teh current channyel.')
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
    cwonst tim = Math.wound(ctx.args.get('tim').value)
    if (tim > 600) return ctx.repwyT('erwor', 'cwommands:swowmwode.rateLimited')
    if (tim < 0) return ctx.repwyT('erwor', 'cwommands:swowmwode.minyimalTimeLimited')
    if (tim <= 0) {
      ctx.message.channyel.edit({
        rateLimitPerUser: tim
      }).then(() => {
        ctx.repwyT('success', 'cwommands:swowmwode.rateLimitDisable', { 0: ctx.message.channyel.mention })
      })
    } else {
      ctx.message.channyel.edit({
        rateLimitPerUser: tim
      }).then(() => {
        ctx.repwyT('success', 'cwommands:swowmwode.rateLimitEnyable', { 0: ctx.message.channyel.mention, 1: tim })
      })
    }
  }
}
