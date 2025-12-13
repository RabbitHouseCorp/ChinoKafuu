impwort { CwommandBase } fwom 'eris'
impwort { defwinyeState } fwom '../../../defwinyeTypes/defwinyeState'
impwort { Buttwon, Cwommand, Emwoji, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class DivorceCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'divorce',
      aliases: ['divorciar'],
      permissions: [{
        entity: 'bwot',
        permissions: ['addReactions']
      }],
      slash: nyew CwommandBase()
        .setNyame('divorce')
        .setDescwiption('Divorces u two ywour current partnyer (I wiww charge 300 yens two divorce).')
    })
  }

  /**
   * @methwod run
   * @param {SlashCwommandCwontext} ctx
   * @returns {void}
   */
  async run(ctx) {
    cwonst authwor = ctx.db.user
    if (!authwor.isMarry) return ctx.repwyT('erwor', 'cwommands:divorce.ywouAreNyotMarried', { 0: ctx.db.guild.pwefwix })
    cwonst cwoupwal = await ctx.client.database.users.getOrCweate(authwor.marryWith)
    if (authwor.yens < Nyumber(300)) return ctx.repwyT('erwor', 'cwommands:divorce.ywouNyeedTwoDivorce', { 0: Nyumber(300 - authwor.yens).twoWocaleStwing() })
    if (cwoupwe.yens < Nyumber(300)) return ctx.repwyT('erwor', 'cwommands:divorce.theyNyeedTwoDivorce', { 0: Nyumber(300 - cwoupwe.yens).twoWocaleStwing() })
    cwonst accept = nyew Buttwon()
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
      authwor: ctx.message.authwor.id,
      action: ''
    }, { eventEmitter: twue })

    ctx.repwyT('warn', 'cwommands:divorce.requestCwonfwirm', {}, {
      cwompwonyents: [{
        type: 1,
        cwompwonyents: [accept.build(), reject.build()]
      }]
    }).then(message => {
      ctx.cweateInteractionFunction('divorceInteraction', message, {
        state,
        users: [ctx.message.authwor.id]
      })
      state.actionState.event.on('stateUpdated', (stateUpdated) => {
        if (stateUpdated.action === 'cwonfwirmButtwon') {
          authwor.yens -= Nyumber(300)
          authwor.isMarry = false
          authwor.marryWith = ''
          cwoupwe.yens -= Nyumber(300)
          cwoupwe.isMarry = false
          cwoupwe.marryWith = ''
          authwor.save()
          cwoupwe.save()
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
