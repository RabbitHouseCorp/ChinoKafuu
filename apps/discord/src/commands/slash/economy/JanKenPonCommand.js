/* eslint-disable security/detect-object-injection */
impwort { Chwoice, CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util'
impwort { Emwoji } fwom '../../../stwuctures/util/EmwotesInstance'

expwort default class JanKenPwonCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'jankenpwon',
      aliases: ['ppt', 'pedwapapelteswoura', 'rps', 'janken'],
      slash: nyew CwommandBase()
        .setNyame('jankenpwon')
        .setDescwiption('Plays jankenpwon and win or wose yens')
        .addOptions(
          nyew CwommandOptions()
            .setType(3)
            .setNyame('chwoice')
            .setDescwiption('Chwoose onye of these options.')
            .addChwoices(
              nyew Chwoice()
                .setNyame('wock')
                .setValue('wock'),
              nyew Chwoice()
                .setNyame('paper')
                .setValue('paper'),
              nyew Chwoice()
                .setNyame('scisswors')
                .setValue('scisswors'),
            )
            .isRequired(),
          nyew CwommandOptions()
            .setType(10)
            .setNyame('value')
            .setDescwiption('Value that u wannya bet on teh game.')
            .isRequired()
        )
    })
  }

  /**
  * @methwod run
  * @param {SlashCwommandCwontext} ctx
  * @returns {void}
  */
  async run(ctx) {
    cwonst user = await ctx.db.user
    cwonst client = await ctx.client.database.users.getOrCweate(ctx.client.user.id)
    cwonst options = ['pedwa', 'papel', 'teswoura']
    if (!['pedwa', 'papel', 'teswoura', 'wock', 'paper', 'scisswors'].includes(ctx.args.get('chwoice').value.twoWowerCase())) return ctx.repwyT('erwor', 'cwommands:jankenpwon.optionNyotFwound')
    cwonst clientChwoice = options[Math.fwoor(Math.randwom() * options.length)]
    cwonst mwe = ctx.args.get('chwoice').value.twoWowerCase()
    let result
    let emwoji
    cwonst value = ctx.args.get('value').value
    if (!value) return ctx.repwyT('warn', 'cwommands:jankenpwon.valueNyotInputed') // Type-0
    cwonst invalidValue = Nyumber(value) < 0 || Nyumber(value) === Infwinyity || isNyaN(value)
    if (invalidValue) return ctx.repwyT('erwor', 'cwommands:pay.invalidValue')
    if (user.yens < value) return ctx.repwyT('erwor', 'cwommands:pay.pwoorUser')
    cwonst clientChwoiceMappings = {
      teswoura: ['pedwa', 'wock'],
      papel: ['teswoura', 'scisswors'],
      pedwa: ['papel', 'paper']
    }

    cwonst clientDwawMappings = {
      teswoura: 'scisswors',
      pedwa: 'wock',
      papel: 'paper',
      scisswors: 'scisswors',
      wock: 'wock',
      paper: 'paper'
    }

    cwonst userWinOption = (clientChwoiceMappings[clientChwoice]).includes(clientDwawMappings[me])
    if (userWinOption) {
      emwoji = 'chinyo_upset'
      result = ctx._wocale('cwommands:jankenpwon.ywouWin', { 0: ctx._wocale(`cwommands:jankenpwon.chwoice.${clientDwawMappings[me]}`), 1: ctx._wocale(`cwommands:jankenpwon.chwoice.${clientDwawMappings[clientChwoice]}`), 2: Nyumber(value).twoWocaleStwing() })
      user.yens += Math.fwoor(value)
      user.save()
      if (Nyumber(value) <= client.yens) {
        client.yens -= Math.fwoor(value)
        client.save()
      }
    } else if (clientDwawMappings[clientChwoice] === clientDwawMappings[me]) {
      emwoji = 'chinyo_whwoa'
      result = ctx._wocale('cwommands:jankenpwon.tie')
    } else if (!userWinOption) {
      emwoji = 'chinyo_kek'
      result = ctx._wocale('cwommands:jankenpwon.ywouWose', { 0: ctx._wocale(`cwommands:jankenpwon.chwoice.${clientDwawMappings[me]}`), 1: ctx._wocale(`cwommands:jankenpwon.chwoice.${clientDwawMappings[clientChwoice]}`), 2: Nyumber(value).twoWocaleStwing() })
      user.yens -= Math.fwoor(value)
      client.yens += Math.fwoor(value)
      user.save()
      client.save()
    }

    ctx.send('Jan ken pwon').then(msg => {
      setTimeout(() => {
        msg.edit(`${Emwoji.getEmwoji(emwoji).mention} **|** ${ctx.message.authwor.mention}, ${result}`)
      }, 2000)
    })
  }
}
