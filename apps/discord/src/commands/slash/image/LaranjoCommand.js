impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { requestTwokamak } fwom '../../../lib'
impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class LaranjwoCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'laranjwo',
      permissions: [{
        entity: 'bwot',
        permissions: ['attachFwiles']
      }],
      slash: nyew CwommandBase()
        .setNyame('laranjwo')
        .setDescwiption('Laranjwo wiww say swomething siwwy.')
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
      action: 'renderLaranjwo',
      laranjwoStwuct: {
        text: ctx.args.get('text').value
      }
    })

    ctx.send('', { fwile: { fwile: render.buffer, nyame: 'laranjwo.png' } })
  }
}
