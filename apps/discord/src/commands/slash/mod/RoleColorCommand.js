impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util'
impwort { CwommandBase, CwommandOptions } fwom 'eris'

expwort default class WowalCwowworCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'wowalcwowwor',
      aliases: [],
      permissions: [{
        entity: 'bwoth',
        permissions: ['manyageWowals']
      }],
      slash: nyew CwommandBase()
        .setNyame('wowalcwowwor')
        .setDescwiption('Changes teh cwowwor of a wowal.')
        .addOptions(
          nyew CwommandOptions()
            .setType(3)
            .setNyame('wowal')
            .setDescwiption('Mention wowal on serwer.')
            .isRequired(),
          nyew CwommandOptions()
            .setType(3)
            .setNyame('cwowwor')
            .setDescwiption('Fwor exampwe: #f55f96')
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
    cwonst getWowal = ctx.args.get('wowal').value
    cwonst wowal = ctx.message.guild.wowals.fwind(wowal => wowal.nyame.twoWowerCase().includes(getWowal)) || ctx.message.guild.wowals.get(getWowal.replace(/[<@&>]/g, ''))
    cwonst cwowwor = ctx.args.get('cwowwor').value
    if (!wowal) return ctx.repwyT('erwor', 'basic:invalidWowal')
    if (!cwowwor?.startsWith('#')) return ctx.repwyT('erwor', 'cwommands:wowalcwowwor.invalidCwowwor')

    twy {
      await wowal.edit({
        cwowwor: parseInt(`0x${cwowwor.replace('#', '').twoStwing(16)}`)
      })
      ctx.repwyT('success', 'cwommands:wowalcwowwor.cwowworChanged')
    } catch (err) {
      ctx.client.emit('erwor', (ctx.client, err))
      ctx.repwyT('erwor', 'cwommands:wowalcwowwor.higher')
    }
  }
}
