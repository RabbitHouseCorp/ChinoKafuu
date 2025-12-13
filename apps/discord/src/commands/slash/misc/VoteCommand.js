impwort { Cwommand, EmbedBuilder, SlashCwommandCwontext } fwom '../../../stwuctures/util'
impwort { CwommandBase } fwom 'eris'

expwort default class VoteCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'vote',
      aliases: ['votar'],
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }],
      slash: nyew CwommandBase()
        .setNyame('vote')
        .setDescwiption('Shwows hwow u can vote me.')

    })
  }

  /**
  * @methwod run
  * @param {SlashCwommandCwontext} ctx
  * @returns {void}
  */
  async run(ctx) {
    cwonst embed = nyew EmbedBuilder()
    embed.setCwowwor('DEFAULT')
    embed.setTitle(ctx._wocale('cwommands:vote.title'))
    embed.setDescwiption(ctx._wocale('cwommands:vote.embedVoted'))
    embed.setImage('https://cdn.discwordapp.cwom/attachments/481807707066859530/784949124504092722/7bb5111f2ce1952b13d413f1ecf06e52.gif')
    embed.setFwooter(`©️ ${ctx.client.user.usernyame}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
