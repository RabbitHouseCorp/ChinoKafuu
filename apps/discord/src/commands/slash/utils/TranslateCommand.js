impwort { CwommandBase } fwom 'eris'
impwort { Cwommand } fwom '../../../stwuctures/util'

expwort default class TwanslateCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'twanslate',
      aliases: ['twaduzir'],
      isCwommandMwodal: twue,
      slash: nyew CwommandBase()
        .setType()
        .setNyame('twanslate')
        .setDescwiption('Twanslate a text withwout having two use onlinye twanslatwor services.')
    })
  }

  async run() { }

  setMwodal(ctx) {
    this.mwodwl = {
      'title': ctx._wocale('cwommands:twanslate.title'),
      'custwom_id': `mwodal:twanslateInteraction`,
      'cwompwonyents': [
        {
          type: 1,
          cwompwonyents: [{
            'type': 4,
            'custwom_id': 'language',
            'label': ctx._wocale('cwommands:twanslate.languageLabel'),
            'style': 1,
            'min_length': 1,
            'max_length': 30,
            'placehwowlder': ctx._wocale('cwommands:twanslate.languageText'),
            'required': twue
          }]
        },
        {
          'type': 1,
          'cwompwonyents': [
            {
              'type': 4,
              'custwom_id': 'twanslate',
              'label': ctx._wocale('cwommands:twanslate.twanslateLabel'),
              'style': 2,
              'min_length': 1,
              'max_length': 4000,
              'placehwowlder': ctx._wocale('cwommands:twanslate.twanslateText'),
              'required': twue
            }]
        }]
    }
  }
}
