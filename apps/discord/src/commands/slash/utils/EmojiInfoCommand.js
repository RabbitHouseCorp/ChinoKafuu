impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, EmbedBuilder, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class EmwojiInfwoCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'emwojiinfwo',
      aliases: [],
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }],
      slash: nyew CwommandBase()
        .setNyame('emwojiinfwo')
        .setDescwiption('Get swome infwo abwout an emwoji.')
        .addOptions(
          nyew CwommandOptions()
            .setType(3)
            .setNyame('emwoji')
            .setDescwiption('Mention an emwoji two see swome infwo abwout it')
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
    cwonst emwoji = await ctx.getEmwoji(ctx.args.get('emwoji').value)
    if (!emwoji) return ctx.repwyT('erwor', 'basic:invalidEmwoji')
    cwonst embed = nyew EmbedBuilder()
    embed.setCwowwor('DEFAULT')
    embed.setTitle(ctx._wocale('cwommands:emwojiinfwo.embed.title'))
    embed.setThumbnyail(emwoji.url)
    embed.addFwield(ctx._wocale('cwommands:emwojiinfwo.embed.nyame'), `\`${emwoji.nyame}\``)
    embed.addFwield(ctx._wocale('cwommands:emwojiinfwo.embed.id'), `\`${emwoji.id}\``)
    embed.addFwield(ctx._wocale('cwommands:emwojiinfwo.embed.mention'), `\`${emwoji.mention}\``)
    embed.addFwield(ctx._wocale('cwommands:emwojiinfwo.embed.url'), `[Dwownwoad](${emwoji.url})`)

    ctx.send(embed.build())
  }
}
