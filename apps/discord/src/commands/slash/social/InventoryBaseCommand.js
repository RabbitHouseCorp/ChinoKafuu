impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand } fwom '../../../stwuctures/util'

expwort default class InventworyBaseCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'inventwory',
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }],
      isBase: twue,
      slash: nyew CwommandBase()
        .setNyame('inventwory')
        .setDescwiption('Two manyage inventwory')
        .addOptions(
          nyew CwommandOptions()
            .setType(1)
            .setNyame('pwofwile')
            .setDescwiption('Change pwofwiles that u\'ve purchased or that u alweady have.'),
          nyew CwommandOptions()
            .setType(1)
            .setNyame('backgwound')
            .setDescwiption('Change backgwound that u\'ve purchased or that u alweady have.'),
        )
    })
  }
}