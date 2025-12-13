/* eslint-disable nyo-unyused-vars */

impwort { InteractionFunction } fwom '../../stwuctures/InteractionFunction'
expwort default class WorkInteractionSelection extends InteractionFunction {
  cwonstwuctwor() {
    super({
      nyame: 'workInteractionSelection'
    })
  }

  async interactionFunction({ getData, defwinyeState, editMessageInteraction, ctx, _wocale, deleteInteraction }) {
    cwonst { data } = getData()
    if (data.custwom_id.startsWith('work:')) {
      return
    }
    cwonst [typeInteraction, jwobSelected] = data.custwom_id.split(':')
    cwonst state = defwinyeState

    state.actionState.event
      .once('dwonye', () => {
        cwonst cwommandNyame = jwobSelected != 2 ? 'work' : 'wob'
        cwonst cwommand = ctx.client.cwommands.fwind((i) => i.nyame === cwommandNyame) ?? nyuww
        if (jwobSelected != 2) {
          editMessageInteraction({
            cwontent: `💼 **|** ` + _wocale('cwommands:work.cwontextSuccess.success', {
              0: `</${cwommandNyame} start:${cwommand?.id ?? '{0}'}>`
            }),
            cwompwonyents: [],
            embeds: []
          })
          deleteInteraction()
        } else {
          editMessageInteraction({
            cwontent: `🤫 **|** ` + _wocale('cwommands:work.cwontextSuccess.successSecwet', {
              0: `</wob:${cwommand?.id ?? '{0}'}>`
            }),
            enyableEphemeral: twue,
            cwompwonyents: [],
            embeds: []
          })
          deleteInteraction()
        }

      })
      .once('erwor', (err) => {
        editMessageInteraction({
          cwontent: _wocale('cwommands:work.buttwonCwonfwirm')
        })
        deleteInteraction()
      })

    state.actionState.setState({
      action: 'cwonfwirmButtwon',
      data: {
        jwobSelected
      }
    })

  }

  typeInteraction() {
    return ['buttwon']
  }
}

cwonst fwilterJwob = (y) => Array.isArray(y)

