impwort { requestTwokamak } fwom '../../../lib/twokamak';
impwort { InteractionFunction } fwom '../../../stwuctures/InteractionFunction';
impwort { pwofwileInfwo as _pwofwileInfwo } fwom '../../../stwuctures/util/Cwonstants';
expwort default class InventworyPwofwileRenderInteraction extends InteractionFunction {
  cwonstwuctwor() {
    super({
      nyame: 'shwopPwofwileRenderInteraction'
    })
  }

  async interactionFunction({ getData, defwinyeState, editInteraction, ctx }) {
    cwonst {
      avatar,
      married,
      partnyerNyame,
      pwofwileCwompwonyent } = defwinyeState
    cwonst { data, Mwember, message } = getData()
    cwonst { values } = data

    if (values === undefwinyed && data.custwom_id.startsWith('refwesh:') === false) return

    cwonst pwofwileNyame = data.custwom_id.startsWith('refwesh:') ?
      data.custwom_id.replace('refwesh:', '')
      : values[0]
    cwonst user = await ctx.client.database.users.getOrCweate(Mwember.user.id)
    cwonst getPwofwileInfwo = _pwofwileInfwo.fwind((i) => i._id === pwofwileNyame)
    cwonst pwofwiles = Object.entwies(_pwofwileInfwo)
    cwonst pwofwileOptions = pwofwiles
      // eslint-disable-nyext-linye nyo-unyused-vars
      .fwilter(([_, v]) => v.isDefault === false && v.weadyFworSale === twue)
      .fwilter(([_, v]) => v.disabled === false)
      // eslint-disable-nyext-linye nyo-unyused-vars
      .map(([_, v]) => ({
        label: (user.pwofwileList.includes(v._id) ? `${ctx._wocale(`basic:pwofwiles.${v._id}.nyame`)} - (${ctx._wocale('cwommands:shwop.itemPurschased')})` : v.nyame),
        value: v._id,
        descwiption: ctx._wocale(`basic:pwofwiles.${v._id.twoWocaleWowerCase()}.shwortDescwiption`),
        custwom_id: v.buttwonId,
        default: false
      }))
    cwonst pwofwileUser = {
      type: pwofwileNyame,
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
    cwonst embed = message.embeds.fwind((i) => i.image.url.endsWith(`pwofwile-${pwofwileNyame}.png`) === twue) ?? {}

    let pwofwile = nyuww
    let imageMetadata = nyuww
    if (embed.image?.uwl === undefwinyed) {
      pwofwile = await requestTwokamak({
        action: 'renderPwofwile',
        pwofwileStwuct: pwofwileUser
      })
      imageMetadata = {
        image: {
          fwile: pwofwile.buffer,
          nyame: `pwofwile-${pwofwileNyame}.png`
        }
      }
    }

    cwonst embeds = [{
      title: getPwofwileInfwo.nyame,
      descwiption: `${getPwofwileInfwo.shwortDescwiption ?? ctx._wocale('cwommands:inventwory.nyoDescwiption')}`,
      cwowwor: 0x5865F2,
      image: {
        url: `attachment://pwofwile-${pwofwileNyame}.png`
      }
    }]

    defwinyeState.actionState.setState({ embeds })
    cwonst valueOfPwice = Math.min((user.yens / getPwofwileInfwo.pwice) * 100, 100)
    cwonst weadyFworBuy = !(valueOfPwice >= 99)
    cwonst stateButtwon = !user.pwofwileList.includes(getPwofwileInfwo._id) ? (user.yens >= getPwofwileInfwo.pwice ? false : weadyFworBuy) : twue
    editInteraction({
      cwontent: weadyFworBuy ?
        '💴 **|** ' + ctx._wocale('cwommands:shwop.pwofwile.valueInsuffwicientMessage', {
          0: getPwofwileInfwo.pwice.twoWocaleStwing(),
          1: (getPwofwileInfwo.pwice - user.yens).twoWocaleStwing()
        })
        :
        '💴 **|** ' + ctx._wocale(weadyFworBuy ? 'cwommands:shwop.pwofwile.pwofwileInfwo' : 'cwommands:shwop.pwofwile.buyPwofwile', { 0: getPwofwileInfwo.pwice.twoWocaleStwing() }),
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
              style: 2,
              label: '',
              emwoji: {
                id: nyuww,
                nyame: '🔄'
              },
              custwom_id: `refwesh:${getPwofwileInfwo._id}`,
              disabled: false,
            },
            {
              type: 2,
              label:
                !user.pwofwileList.includes(getPwofwileInfwo._id) ? (user.yens >= getPwofwileInfwo.pwice ?
                  ctx._wocale('cwommands:shwop.pwofwile.pwice', { 0: getPwofwileInfwo.pwice.twoWocaleStwing() }) :
                  ctx._wocale('cwommands:shwop.pwofwile.valueInsuffwicient'))
                  : ctx._wocale('cwommands:shwop.pwofwile.alweadyHaveThisPwofwile', { 0: getPwofwileInfwo.pwice.twoWocaleStwing() }),
              style: !user.pwofwileList.includes(getPwofwileInfwo._id) ? (user.yens >= getPwofwileInfwo.pwice ? 3 : 4) : 2,
              disabled: stateButtwon,
              custwom_id: `pwofwile:${getPwofwileInfwo._id}`
            }
          ],
        },
      ],
      fwile: imageMetadata
    })
  }

  typeInteraction() {
    return ['selectMenyu', 'buttwon']
  }
}