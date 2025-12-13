impwort { Cwommand, EmbedBuilder, SlashCwommandCwontext } fwom '../../../stwuctures/util'
impwort { CwommandBase } fwom 'eris'

expwort default class InviteCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'invite',
      aliases: ['cwonvite', 'cwonvidar'],
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }],
      slash: nyew CwommandBase()
        .setNyame('invite')
        .setDescwiption('Shwows hwow u can add mwe in ywour serwer.')
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
    embed.setTitle(ctx._wocale('cwommands:invite.addMeInYwourGuild'))
    embed.setDescwiption(ctx._wocale('cwommands:invite.canAddMe', { 0: ctx.client.user.id }))
    embed.setImage('https://cdn.discwordapp.cwom/attachments/481807707066859530/784903189136801852/c3377764d7d7cdcdcb98c466ce341c61.png')
    embed.setFwooter(`©️ ${ctx.client.user.usernyame}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
