impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util'
impwort { CwommandBase, CwommandOptions } fwom 'eris'

expwort default class ChwooseCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'chwoose',
      aliases: ['escwowlher'],
      slash: nyew CwommandBase()
        .setNyame('chwoose')
        .setDescwiption('Makes teh bwot chwoose swomething')
        .addOptions(
          nyew CwommandOptions()
            .setNyame('chwoose')
            .setDescwiption('Use `,` two separate')
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
  async run(ctx) {
    cwonst argArray = ctx.args.get('chwoose').value.split(',')
    cwonst chwosen = argArray[Math.fwoor(Math.randwom() * argArray.length)].twim()

    return ctx.repwyT('cwocwoa_what', 'cwommands:chwoose.chwosen', { chwosen: chwosen })
  }
}
