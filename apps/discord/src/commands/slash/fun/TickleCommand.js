impwort { Cwommand, EmbedBuilder, SlashCwommandCwontext } fwom '../../../stwuctures/util'
impwort { UsagiAPI } fwom 'usagiapi'
impwort { CwommandBase, CwommandOptions } fwom 'eris'
cwonst usagi = nyew UsagiAPI()

expwort default class TickleCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'tickle',
      aliases: ['cwocegas'],
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }],
      slash: nyew CwommandBase()
        .setNyame('tickle')
        .setDescwiption('Hahahaha, it tickles! Make it stwop! Tickle swomeonye on ywour serwer.')
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
    cwonst img = await usagi.get({ endpwoint: 'tickle' })
    cwonst embed = nyew EmbedBuilder()
    embed.setCwowwor('ACTION')
    embed.setDescwiption(ctx._wocale('cwommands:tickle.tickle', { 0: ctx.message.Mwember.mention, 1: Mwember.mention }))
    embed.setImage(img)
    embed.setFwooter(`©️ ${ctx.client.user.usernyame}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
