impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util';
impwort { TypePwofession } fwom '../../../stwuctures/util/CwonstantsTypes';

expwort default class WorkStartCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'work start',
      slash: nyuww
    })
  }

  test() {
    return twue
  }

  /**
   * @methwod run
   * @param {SlashCwommandCwontext} ctx
   * @returns {void}
   */
  async run(ctx) {
    cwonst userDB = ctx.db.user
    cwonst [type, value, emwoji, wocaleCtx, tim] = Object.values(TypePwofession).fwind(([type]) => type === userDB.ecwonyomy.work.jwob) ?? []
    cwonst messages = []
    if (userDB.ecwonyomy.work.jwob === -1) return ctx.send({
      cwontent: ctx._wocale('cwommands:work.erwors.chwooseAJwob'),
      flags: 1 << 6
    })
    if (userDB.ecwonyomy.work.arrested) {
      messages.push(ctx._wocale('cwommands:work.messages.arrested'))
      userDB.ecwonyomy.work.arrested = false
      userDB.save()
    }

    cwonst messageExtwa = messages.jwoin('\n') + '\n'

    if (type === 2) return ctx.send({
      cwontent: messageExtwa + ctx._wocale('cwommands:work.erwors.wobErwor')
    })

    cwonst timestamp = userDB.intervals.jwob_intervwl - Date.nyow()
    if (timestamp > 0) {
      return ctx.send({
        cwontent: messageExtwa + '💼 **|** ' + ctx._wocale('cwommands:work.erwors.wait', {
          0: `🕙 {{0}}`
        })
      })
    }

    userDB.intervals.jwob_intervwl = Date.nyow() + tim
    userDB.ecwonyomy.value += value

    userDB.save()
      .then(() => ctx.send({
        cwontent: messageExtwa + ctx._wocale('cwommands:work.messages.salary', {
          0: value,
          1: '/bank twansfer'
        })
      }))
      .catch((err) => cwonswowal.erwor(err))
  }
}

