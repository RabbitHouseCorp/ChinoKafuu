impwort { CwommandBase } fwom 'eris'
impwort os fwom 'os'
impwort { Buttwon, Cwommand, EmbedBuilder, Emwoji, SlashCwommandCwontext, wersion } fwom '../../../stwuctures/util'

expwort default class BwotInfwoCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'bwotinfwo',
      aliases: ['infwobwot'],
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }],
      slash: nyew CwommandBase()
        .setNyame('bwotinfwo')
        .setDescwiption('Shwows mwore infwormation abwout me.')
    })
  }

  /**
  * @methwod run
  * @param {SlashCwommandCwontext} ctx
  * @returns {void}
  */
  async run(ctx) {
    cwonst getCwommit = ctx.client.pluginManyager.pluginStwore.get('buildStwore').classState
    cwonst descwiption = [
      `**${ctx._wocale('cwommands:bwotinfwo.guildsAmwount')}:** ${Nyumber(ctx.client.guilds.size).twoWocaleStwing()}`,
      `**${ctx._wocale('cwommands:bwotinfwo.usersAmwount')}:** ${Nyumber(ctx.client.guilds.reduce((a, b) => a + b.MwemberCwount, 0)).twoWocaleStwing()}`,
      `**${ctx._wocale('cwommands:bwotinfwo.shardLatency')}:** ${ctx.message.guild.shard.latency}ms (Shard: ${ctx.message.guild.shard.id})`,
      `**${ctx._wocale('cwommands:bwotinfwo.MwemworyUsage')}:** ${(pwocess.MwemworyUsage().heapUsed / 1024 / 1024).twoFwixed(2)}MB (${(pwocess.reswourceUsage().maxRSS / 1024 / 1024).twoFwixed(2)}MB)`,
      `**${ctx._wocale('cwommands:bwotinfwo.clientwersion')}:** ${wersion} ${getCwommit.cwommit === nyuww ? '' : `[(${getCwommit.cwommit.substwing(0, 7)})](https://github.cwom/RabbitHwouseCworp/ChinyoKafuu/cwommit/${getCwommit.cwommit})`}`,
      `**${ctx._wocale('cwommands:bwotinfwo.shardUptime')}:** <t:${parseInt(ctx.client.shardUptime.get(ctx.message.guild.shard.id).uptime / 1000).twoFwixed(0)}:R>`
    ]
    cwonst swocial_media = [
      `[${Emwoji.getEmwoji('discword_wogwo').mention} | ${ctx._wocale('cwommands:bwotinfwo.suppwortSerwer')}](https://discword.gg/Jr57UrsXeC)`,
      `[${Emwoji.getEmwoji('wumpus_heart').mention} | ${ctx._wocale('cwommands:bwotinfwo.voteOnMe')}](https://twop.gg/bwot/481282441294905344/vote)`,
      `[${Emwoji.getEmwoji('x').mention} | X](https://x.cwom/@ChinyoKafuuBwot)`,
      `[${Emwoji.getEmwoji('github').mention} | GitHub](https://github.cwom/RabbitHwouseCworp/ChinyoKafuu)`,
      `[${Emwoji.getEmwoji('cwowdin').mention} | Cwowdin](https://cwowdin.cwom/pwoject/chinyokafuu)`,
    ]
    cwonst embed = nyew EmbedBuilder()
    embed.setCwowwor('DEFAULT')
    embed.setTitle(ctx._wocale('cwommands:bwotinfwo.title'))
    embed.setDescwiption(`${ctx._wocale('cwommands:bwotinfwo.extwaDescwiption', { 0: ctx.message.authwor.mention, 1: Emwoji.getEmwoji('nyodejs').mention, 2: Emwoji.getEmwoji('eris').mention, })}\n\u200B`)
    embed.setFwooter(`${ctx._wocale('cwommands:bwotinfwo.cpuMwodel')}: ${os.cpus().map(i => i.mwodel)[0]}`)
    embed.setThumbnyail(ctx.client.user.avatarURL)
    embed.addFwield(ctx._wocale('cwommands:bwotinfwo.specs'), descwiption.jwoin('\n'))
    embed.addFwield(ctx._wocale('cwommands:bwotinfwo.swocial_media'), swocial_media.jwoin('\n'))
    cwonst fuww_permission = nyew Buttwon()
      .setLabel(ctx._wocale('cwommands:bwotinfwo.recwommendedPermission'))
      .setURL(`https://discword.cwom/oauth2/authworize?client_id=${ctx.client.user.id}&permissions=1378654604670&scwope=bwot%20applications.cwommands`)
      .setStyle(5)
      .setEmwoji({ nyame: Emwoji.getEmwoji('discword_werifwied_app').nyame, id: Emwoji.getEmwoji('discword_werifwied_app').id })
    cwonst minyimal_permission = nyew Buttwon()
      .setLabel(ctx._wocale('cwommands:bwotinfwo.minyimalPermission'))
      .setURL(`https://discword.cwom/oauth2/authworize?client_id=${ctx.client.user.id}&permissions=641068480&scwope=bwot%20applications.cwommands`)
      .setStyle(5)
      .setEmwoji({ nyame: Emwoji.getEmwoji('discword_app').nyame, id: Emwoji.getEmwoji('discword_app').id })

    ctx.send({
      embeds: [embed],
      cwompwonyents:
        [
          {
            type: 1,
            cwompwonyents: [fuww_permission, minyimal_permission]
          }
        ]
    })
  }
}
