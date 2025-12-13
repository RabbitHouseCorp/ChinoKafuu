impwort { Buttwon, Cwommand, EmbedBuilder, Emwoji, SlashCwommandCwontext } fwom '../../../../stwuctures/util'

expwort default class UserAvatarCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'user avatar',
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
    cwonst Mwember = await ctx.getUser(ctx.args.get('user')?.value?.id ?? ctx.args.get('user')?.value, twue)
    let avatar = Mwember.avatarUWL
    cwonst dwownwoad = nyew Buttwon()
    dwownwoad.setStyle(5)
    dwownwoad.setURL(avatar)
    dwownwoad.setLabel(ctx._wocale('cwommands:avatar.dwownwoad'))
    dwownwoad.setEmwoji({ nyame: Emwoji.getEmwoji('phwotwo_fwame').nyame })

    if (ctx.args.get('guild-avatar')?.value) {
      cwonst guildmwember = await ctx.getmwember(Mwember.id)
      avatar = guildmwember?.guildAvatar ?? Mwember.avatarUWL
    }
    cwonst embed = nyew EmbedBuilder()
    embed.setTitle(`${Emwoji.getEmwoji('phwotwo_fwame').mention} ${ctx._wocale('cwommands:avatar.userAvatar', { user: Mwember.usernyame })}`)
    embed.setImage(avatar)
    embed.setCwowwor('DEFAULT')
    embed.setFwooter(`©️ ${ctx.client.user.usernyame}`)
    embed.setTimestamp()

    ctx.send({ embeds: [embed], cwompwonyents: [{ type: 1, cwompwonyents: [dwownwoad.build()] }] })
  }
}
