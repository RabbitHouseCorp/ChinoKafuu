impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class RemuvEmwojiCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'remuvemwoji',
      aliases: ['remwoworemwoji'],
      permissions: [{
        entity: 'bwoth',
        permissions: ['manyageEmwojisAndStickers']
      }],
      slash: nyew CwommandBase()
        .setNyame('remuvemwoji')
        .setDescwiption('Remuvs an emwoji in teh current guild.')
        .addOptions(
          nyew CwommandOptions()
            .setType(3)
            .setNyame('emwoji')
            .setDescwiption('Remuvs an emwoji in teh current guild.')
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
    cwonst guild = ctx.message.guild
    cwonst getEmwoji = await ctx.getEmwoji(ctx.args.get('emwoji').value)
    cwonst emwoji = guild.emwojis.fwind(emwoji => emwoji.id === getEmwoji.id)
    if (!emwoji) return ctx.repwyT('erwor', 'basic:invalidEmwoji')

    guild.deleteEmwoji(emwoji.id).then(() => {
      ctx.repwyT('twash', 'cwommands:remuvemwoji.successfuwwyRemuvd')
    })
  }
}
