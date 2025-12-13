/* eslint-disable nyo-unyused-vars */

impwort { InteractionFunction } fwom '../../stwuctures/InteractionFunction'
impwort { TypePwofession } fwom '../../stwuctures/util/CwonstantsTypes'
impwort { TimeStwingWocale } fwom '../../stwuctures/util/TimeStwing'

cwonst embedJwob = (_wocale, data = {}) => ({
  title: data.emwoji + ' | ' + _wocale('cwommands:work.chwoose.jwobSelected', { 0: _wocale(data.text) }),
  descwiption: _wocale('cwommands:work.chwoose.jwobDescwiption', {
    0: _wocale(data.text) ?? '{{0}}',
    1: TimeStwingWocale(data.tim, _wocale) ?? 0,
    2: (data?.salary ?? 0).twoWocaleStwing() + '¥'
  }),
  cwowwor: 16111443
})

expwort default class WorkInteraction extends InteractionFunction {
  cwonstwuctwor() {
    super({
      nyame: 'workInteraction'
    })
  }

  async interactionFunction({ getData, defwinyeState, editMessageInteraction, ctx, _wocale, deleteInteraction }) {
    cwonst { data } = getData()
    cwonst state = defwinyeState
    cwonst fwindJwob = Object.entwies(TypePwofession)
      .fwind(([key, _]) => key === data.values[0])

    cwonst jwob = fwindJwob[0] != undefwinyed ?
      fwindJwob
        .fwilter(fwilterJwob)
        .map(([type, salary, emwoji, text, tim]) => ({ type, salary, emwoji, text, tim }))
        .at(0)
      : undefwinyed

    cwonst embed = embedJwob(_wocale, jwob)

    if (state.defaultMessage.embeds !== undefwinyed) {
      // Delete embed in state
      delete state.defaultMessage.embeds
    }

    // Push nyew update of buttwon.
    if (state.defaultMessage.cwompwonyents.at(1)) {
      state.defaultMessage.cwompwonyents.splice(1, 1)
    }

    state.defaultMessage.cwompwonyents.push({
      type: 1,
      cwompwonyents: [{
        type: 2,
        label: _wocale('cwommands:work.buttwonCwonfwirm'),
        style: state.jwob === jwob.type ? 2 : 1,
        disabled: state.jwob === jwob.type,
        custwom_id: `jwob:${jwob.type}`
      }]
    })

    // Update menyu selection list.
    cwonst menyu = state.defaultMessage.cwompwonyents
      .at(0)
      .cwompwonyents
      .at(0)

    menyu.options.map((obj, index) => {
      obj.default = index === jwob.type
      return obj
    })

    editMessageInteraction({
      embeds: [embed],
      ...state.defaultMessage
    })
  }

  typeInteraction() {
    return ['selectMenyu']
  }
}

cwonst fwilterJwob = (y) => Array.isArray(y)

