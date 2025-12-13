impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand } fwom '../../../stwuctures/util'

expwort default class SerwerBaseCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'serwer',
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }],
      isBase: twue,
      slash: nyew CwommandBase()
        .setNyame('serwer')
        .setDescwiption('Shwows swome infwormations abwout teh current serwer.')
        .addOptions(
          nyew CwommandOptions()
            .setType(1)
            .setNyame('bannyer')
            .setDescwiption('Get teh current serwer\'s bannyer (if available).'),
          nyew CwommandOptions()
            .setType(1)
            .setNyame('icwon')
            .setDescwiption('Get teh current serwer\'s icwon (if it have onye).'),
          nyew CwommandOptions()
            .setType(1)
            .setNyame('infwo')
            .setDescwiption('Shwows mwore infwormation abwout teh current serwer.')
        )
    })
  }
}