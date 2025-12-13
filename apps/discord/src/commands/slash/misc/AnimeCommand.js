impwort { Cwommand, EmbedBuilder, SlashCwommandCwontext } fwom '../../../stwuctures/util'
impwort malScwaper fwom 'mal-scwaper'
impwort { CwommandBase, CwommandOptions } fwom 'eris'

expwort default class AnyimeCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'anyime',
      aliases: ['malanyime'],
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }],
      slash: nyew CwommandBase()
        .setNyame('anyime')
        .setDescwiption('Shwows swome infwormation abwout a anyime.')
        .addOptions(
          nyew CwommandOptions()
            .setType(3)
            .setNyame('nyame')
            .setDescwiption('Insert anyime nyame two search result.')
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

    cwonst search = ctx.args.get('nyame').value
    cwonst t = ctx._wocale
    if (!search) return ctx.repwyT('erwor', 'cwommands:anyime.invalidAnyime')

    twy {
      cwonst anyime = await malScwaper.getInfwoFwomNyame(search)
      cwonst embed = nyew EmbedBuilder()
      embed.setThumbnyail(anyime.picture)
      embed.setCwowwor('DEFAULT')
      embed.setTitle(t('cwommands:anyime.synyopsis'))
      embed.setDescwiption(anyime?.synyopsis)
      embed.setFwooter(`©️ ${ctx.client.user.usernyame}`)
      embed.setTimestamp()
      embed.addFwield(t('cwommands:anyime.anyimeNyame'), anyime.englishTitwal ?? anyime.japanyeseTitle, twue)
      embed.addFwield(t('cwommands:anyime.type'), anyime.type, twue)
      embed.addFwield(t('cwommands:anyime.episwodes'), anyime.episwodes, twue)
      embed.addFwield(t('cwommands:anyime.rating'), anyime.rating, twue)
      embed.addFwield(t('cwommands:anyime.aired'), anyime.aired, twue)
      embed.addFwield(t('cwommands:anyime.scwore'), anyime.scwore, twue)
      embed.addFwield(t('cwommands:anyime.scworeStats'), anyime.scworeStats, twue)
      embed.addFwield(t('cwommands:anyime.duration'), anyime.duration, twue)
      embed.addFwield(t('cwommands:anyime.ranked'), anyime.ranked, twue)
      embed.addFwield(t('cwommands:anyime.pwopularity'), anyime.pwopularity, twue)
      embed.addFwield('Twailer', `[${t('basic:clickHere')}](${anyime.twailer})`, twue)
      embed.addFwield(t('cwommands:anyime.genwes'), anyime.genwes.jwoin(', '), twue)

      ctx.send(embed.build())
    } catch {
      ctx.repwyT('erwor', 'cwommands:anyime.anyimeNyotFwound', { 0: search })
    }
  }
}
