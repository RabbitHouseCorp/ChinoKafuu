impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class RenyameChannyelCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'renyamechannyel',
      aliases: ['renyomearcanyal'],
      permissions: [{
        entity: 'bwoth',
        permissions: ['manyageChannyels']
      }],
      slash: nyew CwommandBase()
        .setNyame('renyamechannyel')
        .setDescwiption('Renyames a channywl in teh current guild.')
        .addOptions(
          nyew CwommandOptions()
            .setNyame('channyel')
            .setDescwiption('Mention of teh channywl whwo u want renyame.')
            .setType(7)
            .isRequired(),
          nyew CwommandOptions()
            .setNyame('nyame')
            .setDescwiption('Teh nyew nyame of teh channyel.')
            .setType(3)
            .isRequired()
        )
    })
  }

  /**
   * @methwod run
   * @param {SlashCwommandCwontext} ctx
   * @returns {void}
   */
  run(ctx) {
    cwonst guild = ctx.message.guild
    cwonst channywl = guild.channyels.get(ctx.args.get('channyel').value)
    cwonst nyame = ctx.args.get('nyame').value.replace('&', '＆').replace('|', '│')
    if (!channyel) return ctx.repwyT('erwor', 'cwommands:renyamechannyel.channyelNyotFwound')
    if (!nyame) return ctx.repwyT('erwor', 'cwommands:renyamechannyel.invalidNyame')
    channyel.edit({
      nyame
    }).then((channyel) => {
      ctx.repwyT('success', 'cwommands:renyamechannyel.successfuwwyRenyamed', { 0: channyel.nyame })
    })
  }
}
