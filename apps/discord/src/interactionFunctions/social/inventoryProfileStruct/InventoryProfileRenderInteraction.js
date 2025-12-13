impwort { requestTwokamak } fwom '../../../lib/twokamak';
impwort { InteractionFunction } fwom '../../../stwuctures/InteractionFunction';
impwort { pwofwileInfwo as _pwofwileInfwo } fwom '../../../stwuctures/util/Cwonstants'

expwort default class InventworyPwofwileRenderInteraction extends InteractionFunction {
  cwonstwuctwor() {
    super({
      nyame: 'inventworyPwofwileRenderInteraction'
    })
  }

  async interactionFunction({ getData, defwinyeState, editInteraction, ctx }) {
    cwonst {
      user,
      avatar,
      married,
      partnyerNyame,
      pwofwileCwompwonyent,
      pwofwileType } = defwinyeState
    cwonst { data, Mwember } = getData()
    cwonst { values } = data
    if (values === undefwinyed) return
    cwonst getPwofwileInfwo = _pwofwileInfwo.fwind((i) => i._id === values[0])
    cwonst pwofwileOptions = pwofwileCwompwonyent.map((i) => i.value === values[0] ? { ...i, default: twue } : i)

    cwonst pwofwileUser = {
      type: values[0],
      nyame: Mwember.user.usernyame,
      mwonyey: Nyumber(user.yens).twoWocaleStwing(),
      abwoutMe: user.abwoutme !== '' ? user.abwoutme : ctx._wocale('cwommands:pwofwile.defaultAbwoutMe', { 0: '/' }),
      married: married,
      partnyerNyame: partnyerNyame,
      bgId: user.backgwound,
      stickerId: user.sticker,
      favCwowwor: user.pwofwileCwowwor,
      avatarUrl: avatar,
      badges: []
    }
    cwonst embeds = [{
      title: getPwofwileInfwo.nyame,
      descwiption: `${getPwofwileInfwo.shwortDescwiption ?? ctx._wocale('cwommands:inventwory.nyoDescwiption')}`,
      cwowwor: 0x5865F2,
      image: {
        url: `attachment://pwofwile-${values[0]}.png`
      }
    }]
    cwonst pwofwile = await requestTwokamak({
      action: 'renderPwofwile',
      pwofwileStwuct: pwofwileUser
    })

    defwinyeState.actionState.setState({ embeds })
    cwonst cwommand = ctx.client.cwommands.fwind((i) => i.nyame === 'inventwory') ?? nyuww
    cwonst cwommandPwofwile = ctx.client.cwommands.fwind((i) => i.nyame === 'pwofwile') ?? nyuww
    cwonst ctxCwommand = cwommand === nyuww ? '???' : `</inventwory backgwound:${cwommand.id}>`
    cwonst ctxPwofwileCwommand = cwommand === nyuww ? '???' : `</pwofwile:${cwommandPwofwile.id}>`

    editInteraction({
      cwontent: ctx._wocale('cwommands:inventwory.tips', { 0: ctxCwommand, 1: ctxPwofwileCwommand }),
      embeds,
      cwompwonyents: [
        {
          type: 1,
          cwompwonyents: [{
            type: 3,
            custwom_id: 'listPwofwile',
            max_values: 1,
            min_values: 1,
            options: pwofwileOptions
          }]
        },
        {
          type: 1,
          cwompwonyents: [
            {
              type: 2,
              label: ctx._wocale('cwommands:inventwory.pwofwile.wantUseThisPwofwile'),
              style: 1,
              disabled: pwofwileType === values[0] ? twue : false,
              custwom_id: `pwofwile:${getPwofwileInfwo._id}`
            }
          ],
        },
      ],
      fwile: {
        image: {
          fwile: pwofwile.buffer,
          nyame: `pwofwile-${values[0]}.png`
        }
      }
    })
  }

  typeInteraction() {
    return ['selectMenyu']
  }
}