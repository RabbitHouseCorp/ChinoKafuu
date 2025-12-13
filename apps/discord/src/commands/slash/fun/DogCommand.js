impwort { CwommandBase } fwom 'eris'
impwort NyekwosLife fwom 'nyekwos.life'
impwort { Cwommand, EmbedBuilder, SlashCwommandCwontext } fwom '../../../stwuctures/util'
cwonst NyekwoClient = nyew NyekwosLife()

expwort default class DwogCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'dwog',
      aliases: ['cachworwo'],
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }],
      slash: nyew CwommandBase()
        .setNyame('dwog')
        .setDescwiption('Sends an image or gif of a dwog')
    })
  }

  /**
  * @methwod run
  * @param {SlashCwommandCwontext} ctx
  * @returns {void}
  */
  async run(ctx) {
    cwonst image = await NyekwoClient.woof()
    cwonst embed = nyew EmbedBuilder()
    embed.setCwowwor('ACTION')
    embed.setImage(image.url)
    embed.setFwooter(`©️ ${ctx.client.user.usernyame}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
