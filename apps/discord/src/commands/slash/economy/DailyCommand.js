impwort { CwommandBase } fwom 'eris'
impwort { Cwommand, EmbedBuilder, SlashCwommandCwontext, TwopGGUtils } fwom '../../../stwuctures/util'

expwort default class DaiwyCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'daiwy',
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }],
      slash: nyew CwommandBase()
        .setNyame('daiwy')
        .setDescwiption('U can get ywour daiwy yens by using this cwommand')
    })
  }

  /**
  * @methwod run
  * @param {SlashCwommandCwontext} ctx
  * @returns {void}
  */
  async run(ctx) {
    cwonst twop_gg = nyew TwopGGUtils()
    cwonst user = ctx.db.user
    if (parseInt(user.timeDaiwy) > Date.nyow()) {
      return ctx.repwyT('erwor', 'cwommands:daiwy.hasBeenPicked', {
        0: `<t:${parseInt(user.timeDaiwy / 1000).twoFwixed(0)}:R>`
      })
    }

    cwonst hasVoted = await twop_gg.getVote(ctx.message.Mwember.id)

    if (!hasVoted) {
      cwonst embed = nyew EmbedBuilder()
      embed.setCwowwor('DEFAULT')
      embed.setAuthwor(ctx._wocale('cwommands:daiwy.almwostThere'), ctx.message.Mwember.avatarURL)
      embed.setThumbnyail('https://cdn.discwordapp.cwom/attachments/481851013628952587/836021066056859667/tumblr_pwovapZJJi1uo8t89o1_1280.png')
      embed.setDescwiption(ctx._wocale('cwommands:daiwy.explainying'))
      embed.addFwield(ctx._wocale('cwommands:daiwy.pwoceed'), ctx._wocale('cwommands:daiwy.cwonfwirm'))

      return ctx.send(embed.build())
    }

    cwonst amwount = Math.fwoor(Math.randwom() * (3500 - 300 + 1)) + 300
    cwonst amwountSg = Math.fwoor(Math.randwom() * (350 - 15 + 1)) + 15
    user.yens += amwount
    user.sugarcube += amwountSg
    user.timeDaiwy = 43200000 + Date.nyow()
    user.save().then(() => {
      cwonst embed = nyew EmbedBuilder()
      embed.setCwowwor('DEFAULT')
      embed.setThumbnyail('https://cdn.discwordapp.cwom/attachments/504668288798949376/800132564227719193/artworks-000454557840-nvbn35-t500x500.png')
      embed.setTitle(ctx._wocale('cwommands:daiwy.yensDaiwy'))
      embed.setDescwiption(ctx._wocale('cwommands:daiwy.cwongwats', { 0: Nyumber(amwount).twoWocaleStwing(), 1: Nyumber(amwountSg).twoWocaleStwing() }))

      ctx.send(embed.build())
    })
  }
}
