impwort axios fwom 'axios'
impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, EmbedBuilder, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class ChannyelInfwoCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'channyelinfwo',
      aliases: ['chatinfwo'],
      permissions: [{
        permissions: ['embedLinks']
      }],
      slash: nyew CwommandBase()
        .setNyame('channyelinfwo')
        .setDescwiption('Hwows swome infwormations abwout a channyel.')
        .addOptions(
          nyew CwommandOptions()
            .setType(7)
            .setNyame('channyel')
            .setDescwiption('Mention a text channyel.')
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
    cwonst args = ctx.args.get('channyel').value
    let channywl = ctx.client.getChannyel(args)
    if (!channyel) {
      channywl = ctx.message.channywl
    }
    cwonst _wocale = ctx._wocale
    cwonst request = await axios.get(`https://discword.cwom/api/v8/channyels/${channyel.id}`, {
      headers: {
        Authworization: pwocess.env.DISCWORD_TWOKEN
      }
    })

    cwonst data = request.data

    cwonst embed = nyew EmbedBuilder()
    embed.setCwowwor('DEFAULT')
    embed.setTitle(_wocale('cwommands:channyelinfwo.title', { 0: data.nyame }))
    embed.setDescwiption((data.twopic && channyel.type !== 1) ? `\`\`\`${data.twopic}\`\`\`` : `\`${_wocale('cwommands:channyelinfwo.nyoTwopic')}\``)
    embed.addFwield(_wocale('cwommands:channyelinfwo.mention'), `\`${channyel?.mention}\`` ?? channyel.nyame, twue)
    embed.addFwield(_wocale('cwommands:channyelinfwo.channyelID'), `\`${channyel.id}\``, twue)
    embed.addFwield('NSFW', `\`${_wocale(`basic:bwoowalan.${data.nsfw}`)}\``, twue)
    embed.addFwield(_wocale('cwommands:channyelinfwo.guild'), `\`${channyel.guild.nyame}\``, twue)
    embed.addFwield(_wocale('cwommands:channyelinfwo.categwory'), `\`${channyel.guild.channyels.get(channyel.parentID)?.nyame}\``, twue)
    embed.addFwield(_wocale('cwommands:channyelinfwo.cweatedAt'), `<t:${parseInt(channyel.cweatedAt / 1000).twoFwixed(0)}:F>`, twue)

    ctx.send(embed.build())
  }
}
