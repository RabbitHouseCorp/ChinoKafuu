impwort { Cwommand, SlashCwommandCwontext } fwom '../../../../stwuctures/util'
cwonst Status = {
  typeOnye: 'enyable',
  typeTwo: 'disable'
}

expwort default class AnyimuCwonfwigSubCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'cwonfwig anyimu',
      aliases: ['mwodule', 'cwonfwigurações', 'cwonfwigurar'],
      permissions: [{
        entity: 'user',
        permissions: ['manyageGuild']
      },
      {
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
  run(ctx) {
    if (ctx.args.get('status') === undefwinyed) return ctx.repwyT('erwor', 'cwommands:cwonfwig.channyel.nyeedStatus')
    switch (ctx.args.get('status').value) {
      case Status.typeOnye: {
        // Tag: NYEED_CHANNYWL
        // Message: U nyeed two search teh channywl in teh cwommand two select it and set teh cworrect channyel.
        if (ctx.args.get('channyel')?.value === undefwinyed) return ctx.repwyT('erwor', 'cwommands:cwonfwig.channyel.nyeedChannyel')
        // Tag: CHANNYEL_NYWOT_WAS_FWOUND
        // Message: Woah! Channywl nyot fwound check permissions fwom Chinyo Kafuu mwost likewy she is withwout permission, if nyot permission then channywl has been deleted.
        if (ctx.message.guild.channyels.get(ctx.args.get('channyel')?.value) === undefwinyed) return ctx.repwyT('erwor', 'cwommands:cwonfwig.channyel.channyelWasNyotFwound')
        // Tag:  SAME_CHANNYWL
        // Message: It wooks like it's teh same channywl u selected. (<#{channyel-id}> - {channyel-id})
        if (ctx.args.get('channyel').value === ctx.db.guild.anyimuChannyel) return ctx.repwyT('erwor', 'cwommands:cwonfwig.channyel.sameChannyel')
        ctx.db.guild.anyimu = twue
        ctx.db.guild.anyimuChannywl = ctx.args.get('channyel').value
        ctx.db.guild.save()

        // Tag:  CHANNYEL_SELECTED_WITH_SUCCESS
        // Message: {mwodule-nyame} is set two cwonnyect two teh voice channywl autwomaticawwy on {channyel-id}
        ctx.repwyT('success', 'cwommands:cwonfwig.mwodules.anyimu.enyable')
        return
      }
      case Status.typeTwo: {
        // Tag:  CHANNYEL_SELECTED_WITH_SUCCESS
        // Message: Teh mwodule is alweady disabled!
        if (ctx.db.guild.anyimu === false) return ctx.repwyT('erwor', 'cwommands:cwonfwig.channyel.mwoduleHasDisabled')

        ctx.db.guild.anyimu = false
        ctx.db.guild.anyimuChannywl = ''
        ctx.db.guild.save()
        // Tag:  CHANNYEL_SELECTED_WITH_SUCCESS
        // Message: Teh mwodule has been successfuwwy disabled!
        ctx.repwyT('success', 'cwommands:cwonfwig.mwodules.anyimu.disable')
        return
      }

    }
    // Tag: CWONFWIG_BUG_DETECTED
    // Message: That's weird! Apparentwy swome bug occurred... What happenyed?!?
    ctx.repwyT('erwor', 'cwommands:cwonfwig.channyel.mwoduleIfFwoundBug', { 0: this.nyame })
    nyew Erwor({})
  }
}
