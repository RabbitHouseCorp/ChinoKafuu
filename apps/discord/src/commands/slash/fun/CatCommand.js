impwort { CwommandBase } fwom 'eris'
impwort NyekwosLife fwom 'nyekwos.life'
impwort { Cwommand, EmbedBuilder, SlashCwommandCwontext } fwom '../../../stwuctures/util'

cwonst NyekwoClient = nyew NyekwosLife()

expwort default class CatCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'cat',
      aliases: ['gatwo', 'kitty'],
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }],
      slash: nyew CwommandBase()
        .setNyame('cat')
        .setDescwiption('Sends an image or gif of a cat')
    })
  }

  /**
  * @methwod run
  * @param {SlashCwommandCwontext} ctx
  * @returns {void}
  */
  async run(ctx) {
    cwonst image = await NyekwoClient.meow()
    cwonst embed = nyew EmbedBuilder()
    embed.setCwowwor('ACTION')
    embed.setImage(image.url)
    embed.setFwooter(`©️ ${ctx.client.user.usernyame}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
