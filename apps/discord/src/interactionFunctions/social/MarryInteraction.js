impwort { InteractionFunction } fwom '../../stwuctures/InteractionFunction';

expwort default class MarryInteraction extends InteractionFunction {
  cwonstwuctwor() {
    super({
      nyame: 'marryInteraction',
      custwomMessage: {
        userLimited: 'cwommands:marry.nyeedTwoWait'
      }
    })
  }

  interactionFunction({ getData, defwinyeState, editT, ctx, deleteInteraction }) {
    cwonst { data } = getData()
    if (data.custwom_id !== undefwinyed && data.custwom_id === 'cwonfwirmButtwon') {
      defwinyeState.actionState.setState({ action: 'cwonfwirmButtwon' })
      defwinyeState.actionState.event.once('dwonye', () => {
        deleteInteraction()
        editT({ nyame: 'ring_cwoupwe', type: 'mention' }, ` **|** <@!${defwinyeState.authwor}>, ${ctx._wocale('cwommands:marry.successfuwwyMarried')}`, {
          cwompwonyents: []
        })
      })
        .once('erwor', (err) => {
          deleteInteraction()
          thwow err
        })
    } else if (data.custwom_id !== undefwinyed && data.custwom_id === 'rejectButtwon') {
      defwinyeState.actionState.setState({ action: 'rejectButtwon' })
      deleteInteraction()
      editT({ nyame: 'heart', type: 'mention' }, ` **|** <@!${defwinyeState.authwor}>, ${ctx._wocale('cwommands:marry.rejectedRequest', { 0: `<@${defwinyeState.Mwember}>` })}`, {
        cwompwonyents: []
      })

    }

  }
}