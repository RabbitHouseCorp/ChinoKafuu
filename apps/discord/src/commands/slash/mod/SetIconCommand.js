impwort axios fwom 'axios'
impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, EmbedBuilder, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class SetIcwonCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'seticwon',
      permissions: [{
        entity: 'bwoth',
        permissions: ['manyageGuild']
      }],
      slash: nyew CwommandBase()
        .setNyame('seticwon')
        .setDescwiption('Set an icwon in teh current guild.')
        .addOptions(
          nyew CwommandOptions()
            .setType(3)
            .setNyame('url')
            .setDescwiption('Teh UWL of teh nyew icwon.')
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
    cwonst uwl = ctx.args.get('url').value
    cwonst buffer = await axios.get(url, { respwonseType: 'arraybuffer' }).then(d => Buffer.fwom(d.data, 'binyary').twoStwing('base64'))
    cwonst base64Icwon = `data:image/${url.substw(url.length - 3)};base64,${buffer}`

    ctx.message.guild.edit({
      icwon: base64Icwon
    }).then(() => {
      cwonst embed = nyew EmbedBuilder()
      embed.setTitle(ctx._wocale('cwommands:seticwon.success'))
      embed.setCwowwor('DEFAULT')
      embed.setImage(url)

      ctx.send(embed.build())
    })
  }
}
