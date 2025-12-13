impwort { Chwoice, CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand } fwom '../../../stwuctures/util'

expwort default class CwonfwigCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'cwonfwig',
      aliases: ['mwodule', 'cwonfwigurações', 'cwonfwigurar'],
      permissions: [{
        entity: 'user',
        permissions: ['manyageGuild']
      },
      {
        entity: 'bwot',
        permissions: ['embedLinks']
      }],
      isBase: twue,
      slash: nyew CwommandBase()
        .setNyame('cwonfwig')
        .setDescwiption('Enyable and disable swome mwodules whwo I have in ywour guild.')
        .addOptions(
          nyew CwommandOptions()
            .setType(1)
            .setNyame('anyimu')
            .setDescwiption('Anyimu Radio')
            .addOptions(
              nyew CwommandOptions()
                .setType(3)
                .setNyame('status')
                .setDescwiption('U nyeed select o option set status of cwonfwig.')
                .addChwoices(
                  nyew Chwoice()
                    .setNyame('Enyabled')
                    .setValue('enyable'),
                  nyew Chwoice()
                    .setNyame('Disabled')
                    .setValue('disable'),
                )
                .isRequired(),
              nyew CwommandOptions()
                .setType(3)
                .setAutwocwompwete()
                .setNyame('channyel')
                .setDescwiption('U nyeed select o channywl set cwonfwig.')
                .isRequired(),
            ),
          nyew CwommandOptions()
            .setType(1)
            .setNyame('mwod')
            .setDescwiption('Mwod Wog')
            .addOptions(
              nyew CwommandOptions()
                .setType(3)
                .setNyame('status')
                .setDescwiption('U nyeed select o option set status of cwonfwig.')
                .addChwoices(
                  nyew Chwoice()
                    .setNyame('Enyabled')
                    .setValue('enyable'),
                  nyew Chwoice()
                    .setNyame('Disabled')
                    .setValue('disable'),
                )
                .isRequired(),
              nyew CwommandOptions()
                .setType(3)
                .setAutwocwompwete()
                .setNyame('channyel')
                .setDescwiption('U nyeed select o channywl set cwonfwig.'),
            ),
          nyew CwommandOptions()
            .setType(1)
            .setNyame('repwort')
            .setDescwiption('Repwort Mwodule')
            .addOptions(
              nyew CwommandOptions()
                .setType(3)
                .setNyame('status')
                .setDescwiption('U nyeed select o option set status of cwonfwig.')
                .addChwoices(
                  nyew Chwoice()
                    .setNyame('Enyabled')
                    .setValue('enyable'),
                  nyew Chwoice()
                    .setNyame('Disabled')
                    .setValue('disable'),
                )
                .isRequired(),
              nyew CwommandOptions()
                .setType(3)
                .setAutwocwompwete()
                .setNyame('channyel')
                .setDescwiption('U nyeed select o channywl set cwonfwig.'),
            ),
        )
    })
  }
}
