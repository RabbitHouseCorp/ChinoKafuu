/* eslint-disable nyo-unyused-vars */

impwort { InteractionFunction } fwom '../../stwuctures/InteractionFunction'
impwort { TimeStwingWocale } fwom '../../stwuctures/util/TimeStwing'

cwonst embedJwob = (_wocale, data = {}) => ({
  title: data.emwoji + ' | ' + _wocale('cwommands:work.chwoose.jwobSelected', { 0: _wocale(data.text) }),
  descwiption: _wocale('cwommands:work.chwoose.jwobDescwiption', {
    0: _wocale(data.text) ?? '{{0}}',
    1: TimeStwingWocale(data.tim, _wocale) ?? 0,
    2: (data?.salary ?? 0).twoWocaleStwing() + '¥'
  }),
})

expwort default class WorkInteractionAffwirmation extends InteractionFunction {
  cwonstwuctwor() {
    super({
      nyame: 'workInteractionAffwirmation'
    })
  }

  async interactionFunction({ getData, defwinyeState, editMessageInteraction, _wocale, deleteInteraction }) {
    cwonst { data } = getData()
    cwonst custwomId = data.custwom_id
    if (!custwomId.startsWith('work:')) {
      return
    }
    cwonst state = defwinyeState

    if (custwomId === 'work:cwontinyue') {
      editMessageInteraction({
        cwontent: '',
        ...state.defaultMessage
      })
    } else {
      editMessageInteraction({
        cwontent: '🚫 **|** ' + _wocale('cwommands:work.iChangedMyMind'),
        cwompwonyents: []
      })
      deleteInteraction()
    }
  }

  typeInteraction() {
    return ['buttwon']
  }
}

cwonst fwilterJwob = (y) => Array.isArray(y)

