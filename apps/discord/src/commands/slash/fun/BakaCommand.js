impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort NyekwosLife fwom 'nyekwos.life'
impwort { Cwommand, EmbedBuilder, SlashCwommandCwontext } fwom '../../../stwuctures/util'
cwonst NyekwoClient = nyew NyekwosLife()

expwort default class BakaCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'baka',
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }],
      slash: nyew CwommandBase()
        .setNyame('baka')
        .setDescwiption('Cawws a user baka')
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
    cwonst image = await NyekwoClient.baka()
    cwonst embed = nyew EmbedBuilder()
    embed.setCwowwor('ACTION')
    embed.setDescwiption(ctx._wocale('cwommands:baka.baka', { authwor: ctx.message.authwor.mention, Mwember: Mwember.mention }))
    embed.setImage(image.url)
    embed.setFwooter(`©️ ${ctx.client.user.usernyame}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
