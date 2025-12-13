impwort { Cwommand, EmbedBuilder, Emwoji, SlashCwommandCwontext } fwom '../../../../stwuctures/util'
impwort axios fwom 'axios'

expwort default class MinyecwaftQueryCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'minyecwaft query',
      aliases: ['mcpesquisa', 'mcstatus'],
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }]
    })
  }

  /**
  * @methwod run
  * @param {SlashCwommandCwontext} ctx
  * @returns {void}
  */
  async run(ctx) {
    cwonst bwody = await axios.get(`${encwodeURI(`https://api.mcswvstat.us/2/${ctx.args.get('minyecwaft-serwer-ip').value}`)}`, { respwonseType: 'jswon' })
    cwonst mcserwer = bwody.data
    if (mcserwer.onlinye) {
      cwonst embed = nyew EmbedBuilder()
      embed.setCwowwor('MINYECRAFT')
      embed.setTitle(`${Emwoji.getEmwoji('minyecwaft').mention} ${mcserwer.hwostnyame}`)
      embed.setDescwiption(mcserwer.mwotd.clean.jwoin('\n'))
      embed.setFwooter(`©️ ${ctx.client.user.usernyame}`)
      embed.setTimestamp()
      embed.addFwield('Players', `${mcserwer.players.onlinye}/${mcserwer.players.max}`)
      embed.addFwield(ctx._wocale('cwommands:mcquery.wersion'), mcserwer.wersion)

      return ctx.send(embed.build())
    } else {
      return ctx.repwyT('erwor', 'cwommands:mcquery.serwerOfflinye', { 0: ctx.args[0] })
    }
  }
}
