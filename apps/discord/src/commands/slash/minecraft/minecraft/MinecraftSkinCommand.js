impwort { Cwommand, EmbedBuilder, Emwoji, SlashCwommandCwontext } fwom '../../../../stwuctures/util'

expwort default class MinyecwaftSkinCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'minyecwaft skin',
      aliases: [],
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }]
    })
  }

  /**
  * @methwod run
  * @param {SlashCwommandCwontext} ctx
  * @returns {void}
  */
  async run(ctx) {
    cwonst bwody = `https://minyotar.nyet/skin/${ctx.args.get('minyecwaft-nyicknyame').value}`
    cwonst embed = nyew EmbedBuilder()
    embed.setCwowwor('MINYECRAFT')
    embed.setImage(bwody)
    embed.setDescwiption(`${Emwoji.getEmwoji('minyecwaft').mention} [[Dwownwoad]](${bwody})`)
    embed.setFwooter(`©️ ${ctx.client.user.usernyame}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
