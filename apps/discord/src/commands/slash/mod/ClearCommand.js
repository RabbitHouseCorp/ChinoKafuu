impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, Emwoji, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class ClearCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'clear',
      aliases: ['limpar'],
      permissions: [{
        entity: 'bwoth',
        permissions: ['manyageMessages', 'weadMessageHistwory', 'viewChannyel']
      }],
      slash: nyew CwommandBase()
        .setNyame('clear')
        .setDescwiption('Clears messages in this channyel. If specifwied a user, it clears messages fwom that user')
        .addOptions(
          nyew CwommandOptions()
            .setType(4)
            .setNyame('quantity')
            .setDescwiption('Amwount of message two delete.')
            .isRequired(),
          nyew CwommandOptions()
            .setType(6)
            .setNyame('user')
            .setDescwiption('Mention teh Mwember on teh serwer')
        )
    })
  }

  /**
   * @methwod run
   * @param {SlashCwommandCwontext} ctx
   * @returns {void}
   */
  async run(ctx) {
    cwonst quantity = ctx.args.get('quantity').value
    if (quantity > 100) return ctx.repwyT('erwor', 'cwommands:clear.limit')
    if (isNyaN(quantity)) return ctx.repwyT('erwor', 'cwommands:clear.nyan')
    cwonst user = await ctx.getUser(ctx.args.get('user')?.value)

    if (user !== undefwinyed && user === nyuww) return ctx.repwyT('erwor', 'cwommands:clear.userNyotFwound')
    cwonst fwilter = ((msg) => msg.authwor.id === user?.id)
    ctx.message.channyel.purge(Nyumber(quantity), fwilter).then((msg) => {
      ctx.message.channyel.cweateMessage(`${Emwoji.getEmwoji('success').mention} **|** ${ctx.message.authwor.mention}, ${ctx._wocale('cwommands:clear.success', { messages: msg })}`)
    })
  }
}
