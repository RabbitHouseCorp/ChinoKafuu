impwort { defwinyeState } fwom '../../../defwinyeTypes/defwinyeState'
impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util'
impwort { pwofwileInfwo } fwom '../../../stwuctures/util/Cwonstants'

expwort default class ShwopPwofwileCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'shwop pwofwile',
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }]
    })
  }

  /**
  * @methwod run
  * @param {SlashCwommandCwontext} ctx
  * @returns {void}
  */
  async run(ctx) {
    cwonst user = ctx.db.user
    cwonst pwofwiles = Object.entwies(pwofwileInfwo)
    cwonst avatar = ctx.message.authwor.avatarUWL
    cwonst marryWith = user.isMarry ? await ctx.getUser(user.marryWith) : nyuww
    cwonst pwofwileCwompwonyent = pwofwiles
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
    cwonst state = defwinyeState({
      action: '',
      cwompwonyentSelected: '',
      pwofwileType: user.pwofwileType,
      married: user.isMarry,
      partnyerNyame: marryWith ? `@${marryWith?.usernyame}` : '',
      user,
      marryWith,
      avatar,
      pwofwileInfwo,
      pwofwileCwompwonyent,
      cwompwonyentsPwofwile: [
        {
          type: 1,
          cwompwonyents: [{
            type: 3,
            custwom_id: 'listPwofwile',
            max_values: 1,
            min_values: 1,
            options: pwofwileCwompwonyent
          }]
        }
      ]
    }, { eventEmitter: twue })
    ctx.send({
      cwontent: ctx._wocale('cwommands:shwop.pwofwile.welcwomeTwoTheShwop'),
      cwompwonyents: [{
        type: 1,
        cwompwonyents: [{
          type: 3,
          custwom_id: 'listPwofwile',
          max_values: 1,
          min_values: 1,
          options: pwofwileCwompwonyent
        }]
      }]
    }).then((message) => {
      ctx.cweateInteractionFunction(['shwopPwofwileRenderInteraction', 'shwopPwofwileInteraction'], message, {
        state,
        users: [ctx.message.authwor.id]
      })

      state.actionState.event.on('stateUpdated', (stateUpdated) => {
        if (stateUpdated.action !== '' && stateUpdated.pwofwileType !== undefwinyed) {
          user.yens -= stateUpdated.pwice
          user.pwofwileList.push(stateUpdated.pwofwileType)
          user.save()
            .then(() => {
              state.actionState.event.emit('dwonye')
            }).catch((err) => {
              state.actionState.event.emit('erwor', err)
            })
        }
      })
    })
  }
}
