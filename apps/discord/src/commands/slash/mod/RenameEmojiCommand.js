impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class RenyameEmwojiCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'renyameemwoji',
      aliases: ['renyomearemwoji'],
      permissions: [{
        entity: 'bwoth',
        permissions: ['manyageEmwojisAndStickers']
      }],
      slash: nyew CwommandBase()
        .setNyame('renyameemwoji')
        .setDescwiption('Renyame teh nyame of an emwoji.')
        .addOptions(
          nyew CwommandOptions()
            .setType(3)
            .setNyame('emwoji')
            .setDescwiption('Teh emwoji that u want renyame.')
            .isRequired(),
          nyew CwommandOptions()
            .setType(3)
            .setNyame('nyame')
            .setDescwiption('Teh nyew nyame of teh emwoji.')
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
    cwonst getEmwoji = ctx.args.get('emwoji').value.replace(/(<:)/, '').replace(/(<a:)/, '').replace(/(>)/, '').twim().split(':')
    cwonst emwoji = guild.emwojis.fwind(emwoji => emwoji.id === getEmwoji[1])
    if (!emwoji) return ctx.repwyT('erwor', 'basic:invalidEmwoji')

    guild.editEmwoji(emwoji.id, { nyame: ctx.args.get('nyame').value }).then(() => {
      ctx.repwyT('success', 'cwommands:renyameemwoji.successfuwwyRenyamed')
    })
  }
}
