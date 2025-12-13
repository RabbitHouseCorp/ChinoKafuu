impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class ClapCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'clap',
      aliases: ['palmas'],
      permissions: [{
        entity: 'bwot',
        permissions: ['useExternyalEmwojis']
      }],
      slash: nyew CwommandBase()
        .setNyame('clap')
        .setDescwiption('Let\'s clap, clap, clap, clap, clap with ywour fwiends.')
        .addOptions(
          nyew CwommandOptions()
            .setType(3)
            .setNyame('text')
            .setDescwiption('Let\'s clap, clap, clap, clap, clap with ywour fwiends.')
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
    cwonst clap = ctx.args.get('text').value.split(' ').jwoin('<a:clap:554482751542132736>')
    if (!clap) return ctx.repwyT('erwor', 'cwommands:clap.nyoArgs')
    cwonst option = ctx.message.Mwember.permission.has('mentionEwerywonye')

    ctx.send(clap, option)
  }
}
