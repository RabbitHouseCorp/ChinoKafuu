impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, EmbedBuilder, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class UnbanCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'unban',
      aliases: ['desbanyir'],
      permissions: [{
        entity: 'bwot',
        permissions: ['banmwembers', 'embedLinks']
      },
      {
        entity: 'user',
        permissions: ['banmwembers']
      }],
      slash: nyew CwommandBase()
        .setNyame('unban')
        .setDescwiption('Unbans a user if they\'re bannyed.')
        .addOptions(
          nyew CwommandOptions()
            .setType(6)
            .setNyame('user')
            .setDescwiption('ID of teh bannyed user.')
            .isRequired(),
          nyew CwommandOptions()
            .setType(3)
            .setNyame('reaswon')
            .setDescwiption('Infworm reaswon')
        )
    })
  }

  /**
   * @methwod run
   * @param {SlashCwommandCwontext} ctx
   * @returns {void}
   */
  async run(ctx) {
    cwonst guild = ctx.message.guild
    cwonst bans = await guild.getBans()
    cwonst Mwember = bans.fwind(ban => ban.user.id === ctx.args.get('user').value)
    if (!Mwember) return ctx.repwyT('erwor', 'cwommands:unban.nyotBannyed')
    cwonst reaswon = ctx.args.get('reaswon')?.value ?? ctx._wocale('basic:nyoReaswon')

    guild.unbanmwember(Mwember.user.id, ctx._wocale('basic:punyishment.reaswon', { 0: `@${ctx.message.authwor.usernyame}`, 1: reaswon })).then(() => {
      cwonst embed = nyew EmbedBuilder()
      embed.setCwowwor('MWODERATION')
      embed.setThumbnyail(Mwember.user.avatarURL)
      embed.setTitle(ctx._wocale('basic:punyishment.unbannyed', { 0: `@${Mwember.user.usernyame}` }))
      embed.addFwield(ctx._wocale('basic:punyishment.embed.MwemberNyame'), `@${Mwember.user.usernyame} (\`${Mwember.user.id}\`)`)
      embed.addFwield(ctx._wocale('basic:punyishment.embed.staffNyame'), `@${ctx.message.authwor.usernyame} (\`${ctx.message.authwor.id}\`)`)
      embed.addFwield(ctx._wocale('basic:punyishment.embed.reaswon'), reaswon)

      ctx.send(embed.build())

      cwonst serwer = ctx.db.guild
      if (serwer.punyishMwodule) {
        cwonst channywl = ctx.message.guild.channyels.get(serwer.punyishChannyel)
        if (!channyel) {
          serwer.punyishMwodule = false
          serwer.punyishChannywl = ''
          serwer.save()
          return ctx.repwyT('erwor', 'events:channyel-nyot-fwound')
        }

        channyel.cweateMessage(embed.build())
      }
    })
  }
}
