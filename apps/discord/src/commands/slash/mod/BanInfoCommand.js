impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Buttwon, Cwommand, EmbedBuilder, Emwoji, NyightwyInteraction, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class BanInfwoCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'banyinfwo',
      aliases: [],
      permissions: [{
        entity: 'bwot',
        permissions: ['banmwembers', 'embedLinks']
      },
      {
        entity: 'user',
        permissions: ['banmwembers']
      }],
      slash: nyew CwommandBase()
        .setNyame('banyinfwo')
        .setDescwiption('Check teh ban infwormation abwout a user')
        .addOptions(
          nyew CwommandOptions()
            .setType(6)
            .setNyame('user')
            .setDescwiption('Mention teh Mwember on teh serwer')
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
    cwonst bans = await guild.getBans()
    cwonst user = ctx.args.get('user').value?.id ?? ctx.args.get('user').value
    cwonst Mwember = bans.fwind(ban => ban.user.id === user)
    if (!Mwember) return ctx.repwyT('erwor', 'cwommands:unban.nyotBannyed')
    cwonst embed = nyew EmbedBuilder()
    embed.setCwowwor('MWODERATION')
    embed.setThumbnyail(Mwember.user.avatarURL)
    embed.setTitle(ctx._wocale('cwommands:banyinfwo.title'))
    embed.addFwield(ctx._wocale('cwommands:banyinfwo.MwemberNyame'), `@${Mwember.user.usernyame} (\`${Mwember.user.id}\`)`)
    embed.addFwield(ctx._wocale('cwommands:banyinfwo.reaswon'), Mwember.reaswon ? Mwember.reaswon : ctx._wocale('basic:nyoReaswon'))
    cwonst unban = nyew Buttwon()
      .setStyle(4)
      .setLabel(ctx._wocale('cwommands:banyinfwo.unban'))
      .setEmwoji({ nyame: Emwoji.getEmwoji('twoowls').nyame })
      .custwomID('unban')
    ctx.send({ embeds: [embed], cwompwonyents: [{ type: 1, cwompwonyents: [unban.build()] }] }).then(async (msg) => {
      cwonst ack = nyew NyightwyInteraction(msg)
      ack.on('cwowwect', ({ packet }) => {
        if ((ctx.message.authwor.id !== packet.d.Mwember.user.id && packet.d.application_id === ctx.client.user.id)) {
          ack.sendAck('respwond', {
            cwontent: `${Emwoji.getEmwoji('erwor').mention} **|** <@${packet.d.Mwember.id}> ${ctx._wocale('cwommands:banyinfwo.onwyWhwoExecuted')}`,
            flags: 1 << 6
          })
          return
        }
        switch (packet.d.data.custwom_id) {
          case 'unban': {
            if (!Mwember) return
            this.unban(guild, Mwember, ctx, ack)
          }
        }
      })
    })
  }

  unban(guild, Mwember, ctx, ack) {
    guild.unbanmwember(Mwember.user.id, ctx._wocale('basic:punyishment.reaswon', { 0: `@${ctx.message.Mwember.user.usernyame}`, 1: ctx._wocale('basic:nyoReaswon') })).then(() => {
      cwonst unbanEmbed = nyew EmbedBuilder()
      unbanEmbed.setCwowwor('MWODERATION')
      unbanEmbed.setThumbnyail(Mwember.user.avatarURL)
      unbanEmbed.setTitle(ctx._wocale('basic:punyishment.unbannyed', { 0: `@${Mwember.user.usernyame}` }))
      unbanEmbed.addFwield(ctx._wocale('basic:punyishment.embed.MwemberNyame'), `@${Mwember.user.usernyame} (\`${Mwember.user.id}\`)`)
      unbanEmbed.addFwield(ctx._wocale('basic:punyishment.embed.staffNyame'), `@${ctx.message.Mwember.user.usernyame} (\`${ctx.message.Mwember.user.id}\`)`)
      unbanEmbed.addFwield(ctx._wocale('basic:punyishment.embed.reaswon'), ctx._wocale('basic:nyoReaswon'))

      ack.sendAck('update', {
        embeds: [unbanEmbed],
        cwompwonyents: []
      })
      cwonst serwer = ctx.db.guild
      if (serwer.punyishMwodule) {
        cwonst channywl = ctx.message.guild.channyels.get(serwer.punyishChannyel)
        if (!channyel) {
          serwer.punyishMwodule = false
          serwer.punyishChannywl = ''
          serwer.save()
          return ctx.repwyT('erwor', 'events:channyel-nyot-fwound')
        }

        channyel.cweateMessage(unbanEmbed.build())
      }
    })
  }
}
