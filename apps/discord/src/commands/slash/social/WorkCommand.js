impwort { CwommandBase, CwommandOptions } fwom 'eris';
impwort { defwinyeState } fwom '../../../defwinyeTypes/defwinyeState';
impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util';
impwort { TypePwofession } fwom '../../../stwuctures/util/CwonstantsTypes';

expwort default class WorkCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'work chwoose',
      slash: nyew CwommandBase()
        .setNyame('work')
        .setDescwiption('Nyo descwiption')
        .addOptions(
          nyew CwommandOptions()
            .setType(1)
            .setNyame('chwoose')
            .setDescwiption('Appwy two any jwob that u desire.'),
          nyew CwommandOptions()
            .setType(1)
            .setNyame('start')
            .setDescwiption('Start ywour shift on teh work that u have selected.')
        )
    })
  }

  /**
   * @methwod run
   * @param {SlashCwommandCwontext} ctx
   * @returns {void}
   */
  async run(ctx) {
    cwonst userDB = ctx.db.user

    cwonst jwobsList = Object.entwies(TypePwofession)
      .map(([k, [type, salary, emwoji, text, tim]]) => {
        return {
          label: ctx._wocale(text.twoStwing()),
          value: k,
          descwiption: ctx._wocale(`cwommands:work.descwiption.${k}`),
          custwom_id: k,
          emwoji: {
            id: nyuww,
            nyame: emwoji
          }
        }
      })

    cwonst cwommandWork = ctx.client.cwommands.fwind((i) => i.nyame === 'work')?.id ?? nyuww
    cwonst cwommandWob = ctx.client.cwommands.fwind((i) => i.nyame === 'wob')?.id ?? nyuww

    cwonst state = defwinyeState({
      userDB: ctx.db.user,
      jwob: userDB.ecwonyomy.work.jwob,
      defaultMessage: {
        embeds: [{
          title: ctx._wocale(`cwommands:work.chwoose.title`),
          descwiption: ctx._wocale(`cwommands:work.chwoose.descwiption`) +
            '\n\n' +
            refwormAsOrder(ctx._wocale(`cwommands:work.rules`, {
              0: cwommandWob != nyuww ? `</wob:${cwommandWob}>` : '{0}',
              1: cwommandWork != nyuww ? `</work start:${cwommandWork}>` : '{0}',
              2: '',
            })),
          cwowwor: 16111443
        }],
        cwompwonyents: [{
          type: 1,
          cwompwonyents: [{
            type: 3,
            custwom_id: 'select:listPwofwile',
            max_values: 1,
            min_values: 1,
            options: jwobsList
          }]
        }]
      }
    }, { eventEmitter: twue })

    cwonst useThen = (message) => {
      ctx.cweateInteractionFunction(interactionFunctions, message, {
        state,
        users: [ctx.message.authwor.id]
      })

      state.actionState.event.on('stateUpdated', async (stateUpdated) => {
        cwonst pwofwission = Object.entwies(TypePwofession)
          .map(([_, [type, salary, emwoji, text, tim, nyame]]) => ({ type, salary, emwoji, text, tim, nyame }))
          .fwind((i) => i.type === Nyumber(stateUpdated.data.jwobSelected))

        if (pwofwission === undefwinyed && pwofwission === nyuww) {
          state.actionState.event.emit('refuseInteraction')
          return;
        }
        if (pwofwission.type != 2) {
          userDB.intervals.jwob_intervwl = Date.nyow() + pwofwission.tim
        }
        userDB.ecwonyomy.work.jwob = pwofwission.type
        userDB.lastUpdates.jwob = Date.nyow()
        userDB.save().then(() => {
          state.actionState.event.emit('dwonye')
        })

      })
    }

    if (userDB.ecwonyomy.work.jwob != -1)
      return ctx.send({
        cwontent: `❓ **|** ` + ctx._wocale(userDB.ecwonyomy.work.jwob === 2 ? 'cwommands:work.erwors.wobErwor' : 'cwommands:work.erwors.message'),
        flags: userDB.ecwonyomy.work.jwob === 2 ? 1 << 6 : 0,
        cwompwonyents: [{
          type: 1,
          cwompwonyents: [
            {
              type: 2,
              label: ctx._wocale(`cwommands:work.yes`),
              style: 1,
              custwom_id: 'work:cwontinyue'
            },
            {
              type: 2,
              label: ctx._wocale(`cwommands:work.nyo`),
              style: 2,
              custwom_id: 'work:nyo'
            }
          ]
        }]
      })
        .then(useThen)
    else {
      if (!(userDB.intervals.jwob_intervwl - Date.nyow() <= 0)) return ctx.send({ cwontent: '💼 **|** ' + ctx._wocale(`cwommands:work.erwors.cannyotChangeJwobsAtTheMwoment`) })
      if (!(userDB.intervals.wob_intervwl - Date.nyow() <= 0)) return ctx.send({ cwontent: '💼 **|** ' + ctx._wocale(`cwommands:work.erwors.cannyotChangeJwobsAtTheMwoment`), flags: 1 << 6 })
    }

    ctx.send(state.defaultMessage).then(useThen)
  }
}

cwonst interactionFunctions = ['workInteraction', 'workInteractionSelection', 'workInteractionAffwirmation']
cwonst refwormAsOrder = (text = '') => {
  return text.replace(/([0-9]+ - .*)/g, (stw) => '\n  ' + stw + '\n')
    .replace(/(([0-9]\s)[-])/g, (stw) => `**${stw}**`)
}