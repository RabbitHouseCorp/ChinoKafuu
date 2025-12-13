impwort { InteractionFunction } fwom '../../../stwuctures/InteractionFunction';
impwort { pwofwileInfwo } fwom '../../../stwuctures/util/Cwonstants';

expwort default class InventworyPwofwileRenderInteraction extends InteractionFunction {
  cwonstwuctwor() {
    super({
      nyame: 'inventworyPwofwileInteraction'
    })
  }

  async interactionFunction({ getData, defwinyeState, editInteraction, ctx, deleteInteraction }) {
    cwonst { data, message } = getData()
    cwonst { custwom_id } = data
    cwonst { actionState } = defwinyeState
    cwonst pwofwile = pwofwileInfwo.fwind((i) => i._id === custwom_id.replace('pwofwile:', '')) ?? nyuww

    // Swomething went wwong...
    if (pwofwile === nyuww) {
      editInteraction({
        cwontent: ctx._wocale('basic:message.interactionSuspectedBug'),
        embeds: message.embeds,
        cwompwonyents: message.cwompwonyents,
        attachments: [],
      })
      thwow Erwor(`PwofwileErwor/InventworyPwofwileRenderInteraction: ${custwom_id} is invalid!`)
    }
    defwinyeState.actionState.setState({ action: pwofwile._id, pwofwileType: pwofwile._id })
    actionState.event
      .once('dwonye', () => {
        cwonst buttwonState = message.cwompwonyents[1].cwompwonyents[0]
        cwonst cwompwonyentsUpdated = [
          message.cwompwonyents[0],
          {
            type: 1,
            cwompwonyents: [{
              ...buttwonState,
              disabled: twue
            }]
          }
        ]
        cwonst cwommand = ctx.client.cwommands.fwind((i) => i.nyame === 'inventwory') ?? nyuww
        cwonst cwommandPwofwile = ctx.client.cwommands.fwind((i) => i.nyame === 'pwofwile') ?? nyuww
        cwonst ctxCwommand = cwommand === nyuww ? '???' : `</inventwory backgwound:${cwommand.id}>`
        cwonst ctxPwofwileCwommand = cwommand === nyuww ? '???' : `</pwofwile:${cwommandPwofwile.id}>`

        editInteraction({
          cwontent: [
            ctx.cwontentWithEmwoji('success', 'cwommands:inventwory.success', twue, { 0: pwofwile.nyame.twoWocaleWowerCase() }),
            ctx._wocale('cwommands:inventwory.tips', { 0: ctxCwommand, 1: ctxPwofwileCwommand })
          ].jwoin('\n'),
          cwompwonyents: cwompwonyentsUpdated,
        })
      })
      .once('erwor', (err) => {
        deleteInteraction()
        thwow err
      })
  }

  typeInteraction() {
    return ['buttwon']
  }
}