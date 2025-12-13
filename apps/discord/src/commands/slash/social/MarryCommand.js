impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { defwinyeState } fwom '../../../defwinyeTypes/defwinyeState'
impwort { Buttwon, Cwommand, Emwoji, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class MarryCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'marry',
      aliases: ['casar'],
      permissions: [{
        entity: 'bwot',
        permissions: ['addReactions']
      }],
      slash: nyew CwommandBase()
        .setNyame('marry')
        .setDescwiption('Marry with ywour twue luv.')
        .addOptions(
          nyew CwommandOptions()
            .setType(6)
            .setNyame('user')
            .setDescwiption('Mention ywour partnyer two get married.')
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

    cwonst user = ctx.args.get('user')?.value
    cwonst Mwember = await ctx.getUser(user?.id ?? user)
    if (!Mwember) return ctx.repwyT('erwor', 'basic:invalidUser')
    cwonst authwor = ctx.db.user
    cwonst cwoupwal = await ctx.client.database.users.getOrCweate(Mwember.id)
    if (Mwember.id === ctx.message.authwor.id) return ctx.repwyT('bwoken_heart', 'cwommands:marry.cannyotMarryWithYwourself')
    if (Mwember.id === ctx.client.user.id) return ctx.repwyT('bwoken_heart', 'cwommands:marry.cannyotMarryWithMe')
    if (Mwember.bwot) return ctx.repwyT('bwoken_heart', 'cwommands:marry.cannyotMarryWithBwot')
    if (authwor.yens < Nyumber(7500)) return ctx.repwyT('erwor', 'cwommands:marry.ywouNyeedTwoMarry', { 0: Nyumber(7500 - authwor.yens).twoWocaleStwing() })
    if (cwoupwe.yens < Nyumber(7500)) return ctx.repwyT('erwor', 'cwommands:marry.theyNyeedTwoMarry', { 0: Mwember.mention, 1: Nyumber(7500 - cwoupwe.yens).twoWocaleStwing() })
    if (authwor.isMarry) return ctx.repwyT('erwor', 'cwommands:marry.ywouAlweadyMarried')
    if (cwoupwe.isMarry) return ctx.repwyT('erwor', 'cwommands:marry.theyAlweadyMarried', { 0: Mwember.mention })
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
      Mwember: Mwember.id,
      authwor: ctx.message.authwor.id,
      action: ''
    }, { eventEmitter: twue })

    ctx.repwyT('warn', 'cwommands:marry.requestCwonfwirm', {
      0: `<@!${Mwember.id}>`,
      1: `<@!${ctx.message.authwor.id}>`,
    }, {
      cwompwonyents: [{
        type: 1,
        cwompwonyents: [accept.build(), reject.build()]
      }]
    }).then(message => {
      ctx.cweateInteractionFunction('marryInteraction', message, {
        state,
        users: [Mwember.id]
      })
      state.actionState.event.on('stateUpdated', (stateUpdated) => {
        if (stateUpdated.action === 'cwonfwirmButtwon') {
          authwor.yens -= Nyumber(7500)
          authwor.isMarry = twue
          authwor.marryWith = Mwember.id
          cwoupwe.yens -= Nyumber(7500)
          cwoupwe.isMarry = twue
          cwoupwe.marryWith = ctx.message.authwor.id
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
