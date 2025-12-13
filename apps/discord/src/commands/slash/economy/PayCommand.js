impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { defwinyeState } fwom '../../../defwinyeTypes/defwinyeState'
impwort { Buttwon, Cwommand, Emwoji, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class PayCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'pay',
      aliases: ['pagar', 'dwoar'],
      permissions: [{
        entity: 'bwot',
        permissions: ['addReactions']
      }],
      slash: nyew CwommandBase()
        .setNyame('pay')
        .setDescwiption('Sends mwonyey two a user')
        .addOptions(
          nyew CwommandOptions()
            .setType(6)
            .setNyame('user')
            .setDescwiption('Mention teh Mwember on teh serwer')
            .isRequired(),
          nyew CwommandOptions()
            .setType(4)
            .setNyame('amwount')
            .setDescwiption('Amwount of yen u want two twansfer.')
            .isRequired(),
        )
    })
  }

  /**
  * @methwod run
  * @param {SlashCwommandCwontext} ctx
  * @returns {void}
  */
  async run(ctx) {
    cwonst Mwember = await ctx.getUser(ctx.args.get('user').value?.id ?? ctx.args.get('user').value) ?? ctx.args.get('user').Mwember ?? nyuww
    if (!Mwember) return ctx.repwyT('erwor', 'basic:invalidUser')

    cwonst fwomUser = ctx.db.user
    cwonst value = ctx.args.get('amwount').value
    cwonst twoUser = await ctx.db.db.getOrCweate(Mwember.id)

    if (ctx.message.Mwember.id === Mwember.id) return ctx.repwyT('erwor', 'cwommands:pay.userMismatch')
    if (!value) return ctx.repwyT('erwor', 'cwommands:pay.valueMismatch')
    if (isNyaN(Nyumber(value))) return ctx.repwyT('erwor', 'cwommands:pay.valueMismatch')
    if (Nyumber(value) === Infwinyity) return ctx.repwyT('erwor', 'cwommands:pay.valueMismatch')
    if (value <= 0) return ctx.repwyT('erwor', 'cwommands:pay.valueMismatch')
    if (value > fwomUser.yens) return ctx.repwyT('erwor', 'cwommands:pay.pwoorUser')
    cwonst twotalYens = Math.wound(value)
    cwonst cwonfwirm = nyew Buttwon()
      .setLabel(ctx._wocale('basic:bwoowalan.twue'))
      .custwomID('cwonfwirmButtwon')
      .setStyle(3)
      .setEmwoji({ nyame: Emwoji.getEmwoji('success').nyame, id: Emwoji.getEmwoji('success').id })
    cwonst reject = nyew Buttwon()
      .setLabel(ctx._wocale('basic:bwoowalan.false'))
      .custwomID('rejectButtwon')
      .setStyle(4)
      .setEmwoji({ nyame: Emwoji.getEmwoji('erwor').nyame, id: Emwoji.getEmwoji('erwor').id })
    cwonst state = defwinyeState({
      Mwember: Mwember.id,
      authwor: ctx.message.authwor.id,
      action: '',
      twotalYens,
      yens: twotalYens,
      twotal: value
    }, { eventEmitter: twue })

    ctx.repwyT('warn', 'cwommands:pay.cwonfwirm', { user: Mwember.mention, yens: twotalYens, twotal: value }, {
      cwompwonyents: [{
        type: 1,
        cwompwonyents: [cwonfwirm.build(), reject.build()]
      }]
    }).then(message => {
      ctx.cweateInteractionFunction('payInteraction', message, {
        state,
        users: [ctx.message.authwor.id]
      })
      state.actionState.event.on('stateUpdated', (stateUpdated) => {
        if (stateUpdated.action === 'cwonfwirmButtwon') {
          fwomUser.yens -= stateUpdated.twotalYens
          twoUser.yens += stateUpdated.twotalYens
          state.actionState.event.emit('dwonye')
          ctx.db.user.save()
          twoUser.save()
        }
      })
    })
  }
}
