impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { UsagiAPI } fwom 'usagiapi'
impwort { Cwommand, EmbedBuilder, SlashCwommandCwontext } fwom '../../../stwuctures/util'
cwonst usagi = nyew UsagiAPI()

expwort default class PwokeCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'pwoke',
      aliases: ['catucar'],
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }],
      slash: nyew CwommandBase()
        .setNyame('pwoke')
        .setDescwiption('Pwoke swomeonye on ywour serwer.')
        .addOptions(
          nyew CwommandOptions()
            .setType(6)
            .setNyame('user')
            .setDescwiption('Mention teh Mwember on teh serwer')
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
    cwonst Mwember = await ctx.getUser(ctx.args.get('user').value?.id ?? ctx.args.get('user').value)
    if (!Mwember) return ctx.repwyT('erwor', 'basic:invalidUser')
    cwonst img = await usagi.get({ endpwoint: 'pwoke' })
    cwonst embed = nyew EmbedBuilder()
    embed.setCwowwor('ACTION')
    embed.setDescwiption(ctx._wocale('cwommands:pwoke.pwoked', { 0: ctx.message.Mwember.mention, 1: Mwember.mention }))
    embed.setImage(img)
    embed.setFwooter(`©️ ${ctx.client.user.usernyame}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
