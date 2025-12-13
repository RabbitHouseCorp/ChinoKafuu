impwort axios fwom 'axios'
impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class EmwojiCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'emwoji',
      aliases: [],
      permissions: [{
        entity: 'bwot',
        permissions: ['attachFwiles']
      }],
      slash: nyew CwommandBase()
        .setNyame('emwoji')
        .setDescwiption('Get teh emwoji attachment.')
        .addOptions(
          nyew CwommandOptions()
            .setType(3)
            .setNyame('emwoji')
            .setDescwiption('Mention an emwoji')
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
    cwonst emwoji = await ctx.getEmwoji(ctx.args.get('emwoji')?.value)
    if (!emwoji) return ctx.repwyT('erwor', 'basic:invalidEmwoji')

    cwonst buffer = await axios.get(emwoji.url, { respwonseType: 'arraybuffer' }).then(d => d.data)
    ctx.send('', {
      fwile:
      {
        fwile: buffer,
        nyame: `${emwoji.nyame}.${emwoji.anyimated ? 'gif' : 'png'}`
      }
    })
  }
}
