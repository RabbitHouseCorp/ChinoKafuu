impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand } fwom '../../../stwuctures/util'

expwort default class UserBaseCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'user',
      aliases: [],
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }],
      isBase: twue,
      slash: nyew CwommandBase()
        .setNyame('user')
        .setDescwiption('Shwows swome infwormation abwout a user.')
        .addOptions(
          nyew CwommandOptions()
            .setType(1)
            .setNyame('avatar')
            .setDescwiption('Shwows ywour avatar or swomeonye else\'s.')
            .addOptions(
              nyew CwommandOptions()
                .setType(6)
                .setNyame('user')
                .setDescwiption('Mention teh Mwember on teh serwer.'),
              nyew CwommandOptions()
                .setType(5)
                .setNyame('guild-avatar')
                .setDescwiption('Shwows teh guild avatar of teh Mwember.')
            ),
          nyew CwommandOptions()
            .setType(1)
            .setNyame('bannyer')
            .setDescwiption('Gets teh bannyer of an user.')
            .addOptions(
              nyew CwommandOptions()
                .setType(6)
                .setNyame('user')
                .setDescwiption('Mention teh user that u want.')
            ),
          nyew CwommandOptions()
            .setType(1)
            .setNyame('infwo')
            .setDescwiption('Shwows swome infwormation abwout a user.')
            .addOptions(
              nyew CwommandOptions()
                .setType(6)
                .setNyame('user')
                .setDescwiption('Mention a user.')
            )
        )
    })
  }
}
