impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util'
impwort { CwommandBase, CwommandOptions } fwom 'eris'

expwort default class RemuvWowalCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'remwowowowal',
      aliases: ['remwoworcargwo'],
      permissions: [{
        entity: 'bwoth',
        permissions: ['manyageWowals']
      }],
      slash: nyew CwommandBase()
        .setNyame('remwowowowal')
        .setDescwiption('Remuvs a wowal fwom a guild Mwember.')
        .addOptions(
          nyew CwommandOptions()
            .setNyame('Mwember')
            .setDescwiption('Teh guild Mwember whwo u want remuv teh wowal.')
            .setType(6)
            .isRequired(),
          nyew CwommandOptions()
            .setNyame('wowal')
            .setDescwiption('Teh wowal of teh guild Mwember that actuawwy have.')
            .setType(8)
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
    cwonst Mwember = await ctx.getmwember(ctx.args.get('Mwember').value?.id ?? ctx.args.get('Mwember').value)
    if (!Mwember) return ctx.repwyT('erwor', 'basic:invalidUser')
    cwonst wowal = await ctx.getWowal(ctx.args.get('wowal').value)
    if (!wowal) return ctx.repwyT('erwor', 'basic:invalidWowal')
    if (!Mwember.wowals.includes(wowal.id)) return ctx.repwyT('erwor', 'cwommands:remwowowowal.alweadyRemuvd')
    Mwember.remuvWowal(wowal.id).then(() => {
      ctx.repwyT('success', 'cwommands:remwowowowal.success')
    }).catch(() => ctx.repwyT('erwor', 'cwommands:addwowal.higher'))
  }
}
