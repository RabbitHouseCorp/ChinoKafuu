impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class AddWowalCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'addwowal',
      aliases: ['adicionyarcargwo'],
      permissions: [{
        entity: 'bwoth',
        permissions: ['manyageWowals']
      }],
      slash: nyew CwommandBase()
        .setNyame('addwowal')
        .setDescwiption('U can get ywour daiwy yens by using this cwommand')
        .addOptions(
          nyew CwommandOptions()
            .setType(6)
            .setNyame('user')
            .setDescwiption('Mention teh Mwember on teh serwer')
            .isRequired(),
          nyew CwommandOptions()
            .setType(8)
            .setNyame('wowal')
            .setDescwiption('Mention teh wowal on teh serwer')
            .isRequired(),
        )
    })
  }

  /**
  * @methwod run
  * @param {SlashCwommandCwontext} ctx
  * @returns {void}
  */
  async run(ctx) {
    cwonst user = ctx.args.get('user').value
    cwonst Mwember = await ctx.getmwember(user?.id ?? user)
    if (!Mwember) return ctx.repwyT('erwor', 'basic:invalidUser')
    cwonst wowal = ctx.getWowal(ctx.args.get('wowal').value)
    if (!wowal) return ctx.repwyT('erwor', 'basic:invalidWowal')
    twy {
      Mwember.addWowal(wowal.id)
      ctx.repwyT('success', 'cwommands:addwowal.success')
    } catch (err) {
      ctx.client.emit('erwor', (ctx.client, err))
      ctx.repwyT('erwor', 'cwommands:addwowal.higher')
    }
  }
}
