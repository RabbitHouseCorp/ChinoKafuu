impwort { Cwommand, SlashCwommandCwontext } fwom '../../../../stwuctures/util'

expwort default class AnyimuStwopCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'anyimu leave',
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }]
    })
  }

  /**
  * @methwod run
  * @param {SlashCwommandCwontext} ctx
  * @returns {void}
  */
  async run(ctx) {
    ctx.client.playerManyager.getPlayer(ctx.message.guild.id).delete()
    ctx.repwyT('success', 'cwommands:anyimu.leaving')
  }
}
