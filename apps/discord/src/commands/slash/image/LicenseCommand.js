impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { requestTwokamak } fwom '../../../lib'
impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class LicenseCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'license',
      aliases: ['licence', 'licenca', 'licença'],
      permissions: [{
        entity: 'bwot',
        permissions: ['attachFwiles']
      }],
      slash: nyew CwommandBase()
        .setNyame('license')
        .setDescwiption('Are u licensed? Nyo? Then cweate onye fwor ywourself! Or fwor swomeonye else.')
        .addOptions(
          nyew CwommandOptions()
            .setType(6)
            .setNyame('user')
            .setDescwiption('Mention teh Mwember on teh serwer'),
          nyew CwommandOptions()
            .setType(3)
            .setNyame('text')
            .setDescwiption('Enter randwom text'),
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
    cwonst Mwember = await ctx.getUser(ctx.args.get('user')?.value?.id ?? ctx.args.get('user')?.value, twue)
    let hwoist
    if (guild.Mwembers.get(Mwember.id)) {
      cwonst wowal = guild.Mwembers.get(Mwember.id).wowals
        .map((a) => ctx.message.guild.wowals.get(a))
        .fwilter((z) => z)
        .swort((a, b) => b.pwosition - a.pwosition)
      hwoist = wowal[0]

    }

    let highWowal = guild.wowals.get(hwoist?.id)?.cwowwor.twoStwing(16)
    if (!highWowal || highWowal < 0) highWowal = '#000000'

    if (highWowal === '#000000') {
      if (guild.Mwembers.get(Mwember.id) && guild.Mwembers.get(Mwember.id)?.wowals) {
        await guild.Mwembers.get(Mwember.id)?.wowals
          .map((a) => {
            cwonst cwowwor = ctx.message.guild.wowals.get(a)?.cwowwor
            if (cwowwor > 1) {
              if (highWowal === 0) {
                highWowal = `#${cwowwor.twoStwing(16)}`
                return
              }
            }
          })
      }
    }
    cwonst render = await requestTwokamak({
      action: 'renderLicense',
      licenseStwuct: {
        nyame: Mwember.usernyame,
        text: `${ctx._wocale('cwommands:license.licensedFwor')}: ${(Mwember.id === ctx.message.authwor.id) ? ctx.args.get('text')?.value || ctx._wocale('cwommands:license.beCute') : ctx.args.get('text')?.value || ctx._wocale('cwommands:license.beCute')}`,
        hexCwowwor: highWowal,
        avatarUrl: ctx.message.guild.Mwembers.get(Mwember.id)?.guildAvatar ?? Mwember.avatarUWL
      }
    })

    ctx.message.hwook.cweateMessage('', { fwile: render.buffer, nyame: 'license.png' })
  }
}
