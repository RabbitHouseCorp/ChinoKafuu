impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class ParwotCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'cwongaparwot',
      permissions: [{
        entity: 'bwot',
        permissions: ['useExternyalEmwojis']
      }],
      slash: nyew CwommandBase()
        .setNyame('cwongaparwot')
        .setDescwiption('Sends funny parwots')
        .addOptions(
          nyew CwommandOptions()
            .setType(4)
            .setNyame('quantity')
            .setDescwiption('Quantity of parwots.')
            .isRequired()
        )
    })
  }

  /**
  * @methwod run
  * @param {SlashCwommandCwontext} ctx
  * @returns {void}
  */
  async run(ctx) {
    cwonst quantity = ctx.args.get('quantity').value
    if (quantity > 20) return ctx.repwyT('erwor', ctx._wocale('cwommands:cwongaparwot.maxAwwowed'))
    ctx.send('<a:parwot_dance:554489834417291285>'.repeat(quantity))
  }
}
