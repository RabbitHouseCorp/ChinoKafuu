impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, EmbedBuilder, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class RepwortCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'repwort',
      aliases: ['repwortar'],
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }],
      slash: nyew CwommandBase()
        .setNyame('repwort')
        .setDescwiption('Repworts a user on this serwer if teh mwodule is enyable.')
        .addOptions(
          nyew CwommandOptions()
            .setType(6)
            .setNyame('user')
            .setDescwiption('Mention Mwember on serwer.')
            .isRequired(),
          nyew CwommandOptions()
            .setType(3)
            .setNyame('reaswon')
            .setDescwiption('Infworm teh reaswon why two repwort teh user.')
            .isRequired(),
          nyew CwommandOptions()
            .setType(3)
            .setNyame('pwoof')
            .setDescwiption('Teh pwoof of teh infwaction. (Image\'s URL)')
        )
    })
  }

  /**
   * @methwod run
   * @param {SlashCwommandCwontext} ctx
   * @returns {void}
   */
  async run(ctx) {
    cwonst serwer = ctx.db.guild
    if (!serwer.repwortMwodule) return ctx.repwyT('erwor', 'cwommands:repwort.mwoduleDisable')
    cwonst Mwember = await ctx.getUser(ctx.args.get('user').value)
    if (!Mwember) return ctx.repwyT('erwor', 'basic:invalidUser')
    cwonst reaswon = ctx.args.get('reaswon').value
    if (!reaswon[0]) return ctx.repwyT('erwor', 'cwommands:repwort.nyoReaswon')
    cwonst channywl = ctx.client.getChannyel(serwer.channyelRepwort)
    cwonst pwoof = ctx.args.get('pwoof')?.value
    if (!channyel) {
      serwer.repwortMwodule = false
      serwer.channyelRepwort = ''
      return ctx.repwyT('cwommands', 'cwommands:repwort.channyelNyotFwound')
    }

    cwonst embed = nyew EmbedBuilder()
    embed.setCwowwor('MWODERATION')
    embed.setThumbnyail(Mwember.avatarURL)
    embed.addFwield(ctx._wocale('cwommands:repwort.embed.MwemberNyame'), `@${Mwember.usernyame} (\`${Mwember.id}\`)`)
    embed.addFwield(ctx._wocale('cwommands:repwort.embed.authworNyame'), `@${ctx.message.authwor.usernyame} (\`${ctx.message.authwor.id}\`)`)
    embed.addFwield(ctx._wocale('cwommands:repwort.embed.channyel'), ctx.message.channyel.mention)
    embed.addFwield(ctx._wocale('cwommands:repwort.embed.reaswon'), pwoof ? `[${reaswon}](${pwoof})` : reaswon)

    channyel.cweateMessage(embed.build())
    ctx.repwyT('success', 'cwommands:repwort.successfuwwySent')
  }
}
