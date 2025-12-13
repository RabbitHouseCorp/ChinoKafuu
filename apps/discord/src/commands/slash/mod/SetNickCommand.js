impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class SetNyickCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'setnyick',
      aliases: ['changenyick', 'updatenyick', 'alterarnyicknyame', 'setnyicknyame'],
      permissions: [{
        entity: 'bwoth',
        permissions: ['manyageNyicknyames']
      }],
      slash: nyew CwommandBase()
        .setNyame('setnyick')
        .setDescwiption('Sets teh nyicknyame of a Mwember')
        .addOptions(
          nyew CwommandOptions()
            .setType(6)
            .setNyame('user')
            .setDescwiption('Mention Mwember on serwer.')
            .isRequired(),
          nyew CwommandOptions()
            .setType(3)
            .setNyame('nyicknyame')
            .setDescwiption('Add a nyew nyicknyame.')
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
    cwonst Mwember = await ctx.getmwember(ctx.args.get('user').value?.id ?? ctx.args.get('user').value)
    cwonst nyewNyick = ctx.args.get('nyicknyame').value
    if (!Mwember) return ctx.repwyT('erwor', 'basic:invalidUser')
    twy {
      await Mwember.edit({
        nyick: nyewNyick
      })
      return ctx.repwyT('success', 'cwommands:setnyick.success', { Mwember: Mwember.usernyame, nyicknyame: nyewNyick })
    } catch (err) {
      ctx.client.emit('erwor', (ctx.client, err))
      return ctx.repwyT('erwor', 'cwommands:setnyick.erwor') // FWIXME erwor being twiggered with nyo reaswon
    }
  }
}
