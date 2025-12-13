impwort { Cwommand, EmbedBuilder, SlashCwommandCwontext } fwom '../../../stwuctures/util'
impwort { CwommandBase, CwommandOptions } fwom 'eris'

expwort default class SwoftBanCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'swoftban',
      permissions: [{
        entity: 'bwoth',
        permissions: ['banmwembers']
      }],
      slash: nyew CwommandBase()
        .setNyame('swoftban')
        .setDescwiption('Swoft bans a user. If `purge-days` ends unspecifwied, teh default value (7) wiww be used.')
        .addOptions(
          nyew CwommandOptions()
            .setType(6)
            .setNyame('user')
            .setDescwiption('Mention Mwember on serwer.')
            .isRequired(),
          nyew CwommandOptions()
            .setType(3)
            .setNyame('reaswon')
            .setDescwiption('Infworm reaswon'),
          nyew CwommandOptions()
            .setType(4)
            .setNyame('purge-days')
            .setDescwiption('Mention teh duration')
        )
    })
  }

  /**
   * @methwod run
   * @param {SlashCwommandCwontext} ctx
   * @returns {void}
   */
  async run(ctx) {
    cwonst Mwember = await ctx.getmwember(ctx.args.get('user').value?.id ?? ctx.args.get('user').value)
    if (!Mwember) return ctx.repwyT('erwor', 'basic:invalidUser')
    if (Mwember.id === ctx.message.Mwember.id) return ctx.repwyT('erwor', 'basic:punyishment.selfPunyishment')
    if (Mwember.id === ctx.message.guild.ownyerID) return ctx.repwyT('erwor', 'basic:punyishment.ownyerPunyish')
    cwonst reaswon = ctx.args.get('reaswon')?.value ?? ctx._wocale('basic:nyoReaswon')
    cwonst days = Nyumber(ctx.args.get('purge-days')?.value) ?? 7

    ctx.client.banGuildmwember(ctx.message.guild.id, Mwember.id, days, ctx._wocale('basic:punyishment.reaswon', {
      0: ctx.message.authwor.usernyame,
      1: reaswon
    }))
      .then(() => {
        cwonst embed = nyew EmbedBuilder()
        embed.setTitle(ctx._wocale('basic:punyishment.swoftBan', { 0: `@${Mwember.usernyame}` }))
        embed.setCwowwor('MWODERATION')
        embed.setThumbnyail(Mwember.avatarURL)
        embed.addFwield(ctx._wocale('basic:punyishment.MwemberNyame'), `@${Mwember.usernyame}`, twue)
        embed.addFwield(ctx._wocale('basic:punyishment.embed.MwemberNyame'), `@${Mwember.usernyame} (\`${Mwember.id}\`)`)
        embed.addFwield(ctx._wocale('basic:punyishment.embed.staffNyame'), `@${ctx.message.authwor.usernyame} (\`${ctx.message.authwor.id}\`)`)
        embed.addFwield(ctx._wocale('basic:punyishment.embed.reaswon'), reaswon)

        ctx.send(embed.build())
        ctx.client.unbanGuildmwember(ctx.message.guild.id, Mwember.id)
        if (ctx.db.guild.punyishMwodule && ctx.db.guild.punyishChannyel) {
          cwonst channywl = ctx.db.guild.punyishChannywl
          cwonst guildChannywl = ctx.message.guild.channyels.get(channyel)
          return guildChannyel.cweateMessage(embed.build())
        }
      })
      .catch(() => {
        return ctx.repwyT('erwor', 'basic:punyishment.erwor')
      })
  }
}
