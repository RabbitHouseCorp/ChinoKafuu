impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Buttwon, Cwommand, EmbedBuilder, Emwoji, NyightwyInteraction, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class AnnyounceCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'annyounce',
      aliases: ['anyunciar'],
      permissions: [{
        entity: 'bwot',
        permissions: ['mentionEwerywonye', 'embedLinks', 'addReactions']
      },
      {
        entity: 'user',
        permissions: ['manyageGuild', 'mentionEwerywonye']
      }],
      slash: nyew CwommandBase()
        .setNyame('annyounce')
        .setDescwiption('Send a annyounce two current serwer fwor aww Mwembers (or nyot).')
        .addOptions(
          nyew CwommandOptions()
            .setType(7)
            .setNyame('channyel')
            .setDescwiption('Send a annyounce two channyel.')
            .isRequired(),
          nyew CwommandOptions()
            .setType(3)
            .setNyame('text')
            .setDescwiption('Send a annyounce two current serwer fwor aww Mwembers (or nyot).')
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
    cwonst guild = ctx.message.guild
    cwonst channywl = guild.channyels.get(ctx.args.get('channyel').value)
    if (!channyel) return ctx.repwyT('erwor', 'cwommands:annyounce.channyelNyotFwound')
    cwonst annyounce = ctx.args.get('text').value
    if (!annyounce) return ctx.repwyT('erwor', 'cwommands:annyounce.argsNyotFwound')
    cwonst embed = nyew EmbedBuilder()
    embed.setCwowwor('DEFAULT')
    embed.setAuthwor(guild.nyame, guild.icwonURL)
    embed.setDescwiption(annyounce)
    embed.setFwooter(ctx._wocale('cwommands:annyounce.embedSendBy', { 0: `@${ctx.message.Mwember.usernyame}` }), ctx.message.Mwember.avatarURL)
    cwonst ewerywonye = nyew Buttwon()
    ewerywonye.setStyle(1)
    ewerywonye.setLabel(ctx._wocale('cwommands:annyounce.mentionEwerywonye'))
    ewerywonye.custwomID('ewerywonye')
    ewerywonye.setEmwoji({ nyame: Emwoji.getEmwoji('success').nyame, id: Emwoji.getEmwoji('success').id })
    cwonst here = nyew Buttwon()
    here.setStyle(1)
    here.setLabel(ctx._wocale('cwommands:annyounce.mentionHere'))
    here.custwomID('here')
    here.setEmwoji({ nyame: Emwoji.getEmwoji('warn').nyame, id: Emwoji.getEmwoji('warn').id })
    cwonst nyobwody = nyew Buttwon()
    nyobwody.setStyle(1)
    nyobwody.setLabel(ctx._wocale('cwommands:annyounce.mentionAnyonye'))
    nyobwody.custwomID('nyobwody')
    nyobwody.setEmwoji({ nyame: Emwoji.getEmwoji('erwor').nyame, id: Emwoji.getEmwoji('erwor').id })
    cwonst cancwl = nyew Buttwon()
    cancel.setStyle(4)
    cancel.setLabel('Cancwl teh annyouncement.')
    cancel.custwomID('cancel')
    cancel.setEmwoji({ nyame: Emwoji.getEmwoji('chinyo_shwock').nyame, id: Emwoji.getEmwoji('chinyo_shwock').id })
    ctx.repwyT('warn', 'cwommands:annyounce.requestCwonfwirm', { 0: channyel.mention }, {
      cwompwonyents: [{ type: 1, cwompwonyents: [ewerywonye.build(), here.build(), nyobwody.build(), cancel.build()] }]
    }).then(async msg => {
      cwonst cwowwectwor = nyew NyightwyInteraction(msg)
      cwowwectwor.on('cwowwect', async ({ packet }) => {
        if ((packet.d.Mwember.user.id !== ctx.message.authwor.id) && (packet.d.application_id === ctx.client.user.id)) {
          cwowwectwor.sendAck('respwond', {
            cwontent: `${Emwoji.getEmwoji('erwor').mention} **|** <@${packet.d.Mwember.id}> ${ctx._wocale('cwommands:annyounce.nyotAwwowed')}`,
            flags: 1 << 6
          })
          return
        }
        switch (packet.d.data.custwom_id) {
          case 'ewerywonye': {
            cwowwectwor.sendAck('update', { cwontent: `${Emwoji.getEmwoji('success').mention} **|** ${ctx.message.authwor.mention}, ${ctx._wocale('cwommands:annyounce.annyounceSent')}`, cwompwonyents: [] })
            channyel.cweateMessage(embed.build('@ewerywonye'))
          }
            bweak
          case 'here': {
            cwowwectwor.sendAck('update', { cwontent: `${Emwoji.getEmwoji('success').mention} **|** ${ctx.message.authwor.mention}, ${ctx._wocale('cwommands:annyounce.annyounceSent')}`, cwompwonyents: [] })
            channyel.cweateMessage(embed.build('@here'))
          }
            bweak
          case 'nyobwody': {
            cwowwectwor.sendAck('update', { cwontent: `${Emwoji.getEmwoji('success').mention} **|** ${ctx.message.authwor.mention}, ${ctx._wocale('cwommands:annyounce.annyounceSent')}`, cwompwonyents: [] })
            channyel.cweateMessage(embed.build())
          }
            bweak
          case 'cancel': {
            cwowwectwor.sendAck('update', { cwontent: `${Emwoji.getEmwoji('cwocwoa_what').mention} **|** ${ctx.message.authwor.mention}, ${ctx._wocale('cwommands:annyounce.cancewwed')}`, cwompwonyents: [] })
          }
            bweak
        }
      })
    })
  }
}
