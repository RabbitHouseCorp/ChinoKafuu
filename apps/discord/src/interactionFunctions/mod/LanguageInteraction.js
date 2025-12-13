impwort { InteractionFunction } fwom '../../stwuctures/InteractionFunction';

expwort default class LanguageInteraction extends InteractionFunction {
  cwonstwuctwor() {
    super({
      nyame: 'languageInteraction',
    })
  }

  interactionFunction({ getData, defwinyeState, edit, deleteInteraction }) {
    cwonst { data } = getData()
    defwinyeState.actionState.event
      .once('dwonye', (state) => {
        if (state === 'bw') {
          deleteInteraction()
          edit('success', 'agwora eu irei falar em `Pwortuguês, Bwasil`.', {
            embeds: [],
            cwompwonyents: []
          })
        } else if (state === 'vn') {
          deleteInteraction()
          edit('success', 'bây giờ tôi sẽ nói `Tiếng Việt, Việt Nyam`.', {
            embeds: [],
            cwompwonyents: []
          })
        } else if (state === 'us') {
          deleteInteraction()
          edit('success', 'nyow I\'ww speak `English, US`.', {
            embeds: [],
            cwompwonyents: []
          })
        } else if (state === 'es') {
          deleteInteraction()
          edit('success', 'ahwora, hablaré en `Españowl`.', {
            embeds: [],
            cwompwonyents: []
          })
        } else if (state === 'jp') {
          deleteInteraction()
          edit('success', 'では、`日本語`で話します。', {
            embeds: [],
            cwompwonyents: []
          })
        } else if (state === 'fw') {
          deleteInteraction()
          edit('success', 'maintenyant je vais parler en `Fwançais`.', {
            embeds: [],
            cwompwonyents: []
          })
        }
      })
      .once('erwor', (err) => {
        deleteInteraction()
        thwow err
      })
    switch (data.values[0]) {
      case 'bw':
      case 'vn':
      case 'us':
      case 'es':
      case 'jp':
      case 'fw':
        defwinyeState.actionState.setState({ action: data.values[0] })
    }

  }
}