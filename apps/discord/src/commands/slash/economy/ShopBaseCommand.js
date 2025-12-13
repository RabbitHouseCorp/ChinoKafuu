impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand } fwom '../../../stwuctures/util'

expwort default class ShwopBaseCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'shwop backgwound',
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }],
      isBase: twue,
      slash: nyew CwommandBase()
        .setNyame('shwop')
        .setDescwiption('Teh shwop cwommand that awwows u two buy nyew things two custwomize ywour accwount.')
        .addOptions(
          nyew CwommandOptions()
            .setType(1)
            .setNyame('pwofwile')
            .setDescwiption('U can buy a nyew pwofwile that is in my stwock.'),
          // nyew CwommandOptions()
          //   .setType(1)
          //   .setNyame('backgwound')
          //   .setDescwiption('U can buy a nyew backgwound that is in my stwock.'),
        )
    })
  }
}