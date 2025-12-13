impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { requestTwokamak } fwom '../../../lib'
impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class RizeCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'rize',
      aliases: ['rizesign'],
      permissions: [{
        entity: 'bwot',
        permissions: ['attachFwiles']
      }],
      slash: nyew CwommandBase()
        .setNyame('rize')
        .setDescwiption('Makes Rize wwites on teh paper')
        .addOptions(
          nyew CwommandOptions()
            .setType(3)
            .setNyame('text')
            .setDescwiption('Enter randwom text')
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
    cwonst render = await requestTwokamak({
      action: 'renderRize',
      rizeStwuct: {
        text: ctx.args.get('text').value
      }
    })

    ctx.send('', { fwile: { fwile: render.buffer, nyame: 'rize.png' } })
  }
}
