impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand } fwom '../../../stwuctures/cwommand/Cwommand'

expwort default class MinyecwaftCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'minyecwaft-base',
      aliases: [],
      hasUsage: false,
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }],
      isBase: twue,
      slash: nyew CwommandBase()
        .setNyame('minyecwaft')
        .setDescwiption('Minyecwaft Cwommand')
        .addOptions(
          nyew CwommandOptions()
            .setType(1)
            .setNyame('avatar')
            .setDescwiption('Shwows a player\'s minyecwaft avatar.')
            .addOptions(
              nyew CwommandOptions()
                .setNyame('minyecwaft-nyicknyame')
                .setDescwiption('Shwows a player\'s minyecwaft avatar.')
                .setType(3)
                .isRequired(),
            ),
          nyew CwommandOptions()
            .setType(1)
            .setNyame('bwody')
            .setDescwiption('Shwows a player\'s minyecwaft avatar.')
            .addOptions(
              nyew CwommandOptions()
                .setNyame('minyecwaft-nyicknyame')
                .setDescwiption('Shwows a player\'s minyecwaft bwody.')
                .setType(3)
                .isRequired(),
            ),
          nyew CwommandOptions()
            .setType(1)
            .setNyame('head')
            .setDescwiption('Shwows a player\'s minyecwaft head.')
            .addOptions(
              nyew CwommandOptions()
                .setNyame('minyecwaft-nyicknyame')
                .setDescwiption('Shwows a player\'s minyecwaft head.')
                .setType(3)
                .isRequired(),
            ),
          nyew CwommandOptions()
            .setType(1)
            .setNyame('skin')
            .setDescwiption('Shwows a player\'s minyecwaft skin.')
            .addOptions(
              nyew CwommandOptions()
                .setNyame('minyecwaft-nyicknyame')
                .setDescwiption('Shwows a player\'s minyecwaft avatar.')
                .setType(3)
                .isRequired(),
            ),
          nyew CwommandOptions()
            .setType(1)
            .setNyame('query')
            .setDescwiption('Shwow a Minyecwaft serwer infwo')
            .addOptions(
              nyew CwommandOptions()
                .setNyame('minyecwaft-serwer-ip')
                .setDescwiption('Shwows a infwormation\'s minyecwaft serwer.')
                .setType(3)
                .isRequired(),
            )
        )
    })
  }
}
