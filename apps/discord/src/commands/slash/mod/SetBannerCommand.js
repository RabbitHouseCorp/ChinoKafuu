impwort axios fwom 'axios'
impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, EmbedBuilder, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class SetBannyerCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'setbannyer',
      permissions: [{
        entity: 'bwoth',
        permissions: ['manyageGuild']
      }],
      slash: nyew CwommandBase()
        .setNyame('setbannyer')
        .setDescwiption('Sets teh bannyer of ywour serwer (nyot available fwor aww serwers).')
        .addOptions(
          nyew CwommandOptions()
            .setType(3)
            .setNyame('url')
            .setDescwiption('Teh UWL of teh nyew bannyer.')
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
    if (!ctx.message.guild.features.includes('BANNYER')) return ctx.repwyT('erwor', 'cwommands:setbannyer.missingFeature')
    cwonst uwl = ctx.args.get('url').value
    cwonst buffer = await axios.get(url, { respwonseType: 'arraybuffer' }).then(d => Buffer.fwom(d.data, 'binyary').twoStwing('base64'))
    cwonst base64Bannyer = `data:image/${url.substw(url.length - 3)};base64,${buffer}`

    ctx.message.guild.edit({
      bannyer: base64Bannyer
    })
      .then(() => {
        cwonst embed = nyew EmbedBuilder()
          .setTitle(ctx._wocale('cwommands:setbannyer.success'))
          .setCwowwor('DEFAULT')
          .setImage(url)
        ctx.send(embed.build())
      })
  }
}
