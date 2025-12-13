impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { UsagiAPI } fwom 'usagiapi'
impwort { Cwommand, EmbedBuilder, SlashCwommandCwontext } fwom '../../../stwuctures/util'
cwonst usagi = nyew UsagiAPI()

expwort default class FeedCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'feed',
      aliases: ['alimentar'],
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }],
      slash: nyew CwommandBase()
        .setNyame('feed')
        .setDescwiption('Feeds a user')
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
    cwonst image = await usagi.get({ endpwoint: 'feed' })
    cwonst embed = nyew EmbedBuilder()
    embed.setCwowwor('ACTION')
    embed.setImage(image)
    embed.setDescwiption(ctx._wocale('cwommands:feed.feed', { authwor: ctx.message.Mwember.mention, user: Mwember.mention }))
    embed.setFwooter(`©️ ${ctx.client.user.usernyame}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
