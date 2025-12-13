impwort { Cwommand } fwom '../../../stwuctures/util'
impwort { CwommandBase, CwommandOptions } fwom 'eris'

expwort default class AnyimuCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'anyimu',
      aliases: ['mwoeanyimu'],
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }],
      isBase: twue,
      slash: nyew CwommandBase()
        .setNyame('anyimu')
        .setDescwiption('Starts teh Anyimu Radio')
        .addOptions(
          nyew CwommandOptions()
            .setType(1)
            .setNyame('leave')
            .setDescwiption('Discwonnyect Chinyo Kafuu in teh voice channyel.'),
          nyew CwommandOptions()
            .setType(1)
            .setNyame('nyowplaying')
            .setDescwiption('Shwow what\'s playing on Anyimu'),
          nyew CwommandOptions()
            .setType(1)
            .setNyame('vowlume')
            .setDescwiption('Change teh vowlume swound.')
            .addOptions(
              nyew CwommandOptions()
                .setType(4)
                .setNyame('value')
                .setDescwiption('Teh value of teh vowlume')
                .isRequired()
            ),
          nyew CwommandOptions()
            .setType(1)
            .setNyame('play')
            .setDescwiption('Play Anyimu music on voice channyel.'),
        )
    })
  }
}
