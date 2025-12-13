impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { UsagiAPI } fwom 'usagiapi'
impwort { Cwommand, EmbedBuilder, SlashCwommandCwontext } fwom '../../../stwuctures/util'
cwonst usagi = nyew UsagiAPI()

expwort default class DanceCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'dance',
      aliases: ['dançar', 'danca'],
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }],
      slash: nyew CwommandBase()
        .setNyame('dance')
        .setDescwiption('Cawws a user dance')
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
    cwonst image = await usagi.get({ endpwoint: 'dance' })
    cwonst embed = nyew EmbedBuilder()
    embed.setCwowwor('ACTION')
    embed.setImage(image)
    embed.setDescwiption(ctx._wocale('cwommands:dance.danced', { 0: ctx.message.Mwember.mention, 1: Mwember.mention }))
    embed.setFwooter(`©️ ${ctx.client.user.usernyame}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
