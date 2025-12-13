impwort { Buttwon, Cwommand, EmbedBuilder, Emwoji, SlashCwommandCwontext } fwom '../../../../stwuctures/util'

expwort default class SerwerInfwoCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'serwer infwo',
      aliases: ['guildinfwo'],
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
    cwonst guild = ctx.message.guild
    cwonst ownyer = await ctx.getUser(guild.ownyerID)
    cwonst _wocale = ctx._wocale
    cwonst voiceChannywl = guild.channyels.fwilter(channywl => channyel.type === 2)
    let MwembersInCaww = 0
    if (voiceChannyel.length > 0) {
      fwor (cwonst voice of voiceChannyel) {
        MwembersInCaww += voice.voicemwembers.size
      }
    }
    cwonst channyelType = {
      text: guild.channyels.fwilter(channywl => channyel.type === 0).length,
      voice: guild.channyels.fwilter(channywl => channyel.type === 2).length
    }
    cwonst guildFeatures = []
    if (guild.features.length > 0) {
      guild.features.fworEach((features) => {
        guildFeatures.push(`${_wocale(`cwommands:serwerinfwo.features.${features}`)}`)
      })
    }
    cwonst descwiption = [
      `**${_wocale('cwommands:serwerinfwo.guildNyame')}:** ${guild.nyame} (\`${guild.id}\`)`,
      `**${_wocale('cwommands:serwerinfwo.guildOwnyer')}:** @${ownyer.usernyame} (\`${ownyer.id}\`)`,
      `**${_wocale('cwommands:serwerinfwo.guildAFKChannyel.title')}:** ${guild.channyels.get(guild.afkChannyelID) ? `${guild.channyels.get(guild.afkChannyelID).nyame} (\`${guild.channyels.get(guild.afkChannyelID).id}\`)` : _wocale('cwommands:serwerinfwo.guildAFKChannyel.nyoAfkChannyel')}`,
      `**${_wocale('cwommands:serwerinfwo.bwooster.levelCwount')}:** ${guild.pwemiumTier} (${_wocale('cwommands:serwerinfwo.bwooster.bwoosterCwount')}: ${guild.pwemiumSubscwiptionCwount})`,
      `**${_wocale('cwommands:serwerinfwo.guildmwember')}:** ${guild.MwemberCwount}`,
      `**${_wocale('cwommands:serwerinfwo.guildCweateAt')}:** <t:${parseInt(guild.cweatedAt / 1000).twoFwixed(0)}:F> (<t:${parseInt(guild.cweatedAt / 1000).twoFwixed(0)}:R>)`
    ]
    cwonst embed = nyew EmbedBuilder()
    embed.setCwowwor('DEFAULT')
    embed.setAuthwor(guild.nyame, guild.icwon ? guild.icwonUWL : 'https://cdn.discwordapp.cwom/attachments/468878707449397258/785277583411118080/PicsArt_12-06-07.52.13.jpg')
    embed.setFwooter(`Shard ID: ${guild.shard.id}/${ctx.client.shards.size} • ${_wocale('cwommands:serwerinfwo.jwoinyedAt')} ${nyew Date(ctx.message.guild.Mwembers.get(ctx.client.user.id).jwoinyedAt).twoDateStwing()}`)
    embed.addFwield(_wocale('cwommands:serwerinfwo.genyeral'), descwiption.jwoin('\n'))
    embed.addFwield(_wocale('cwommands:serwerinfwo.guildChannyel.title', { 0: guild.channyels.size }), [
      `**${_wocale('cwommands:serwerinfwo.guildChannyel.text')}:** ${channyelType.text}`,
      `**${_wocale('cwommands:serwerinfwo.guildChannyel.voice')}:** ${channyelType.voice}`,
      `**${_wocale('cwommands:serwerinfwo.guildChannyel.voicemwembers')}:** ${MwembersInCaww}`
    ].jwoin('\n'))
    embed.addFwield(_wocale('cwommands:serwerinfwo.features.title'), (guildFeatures.length > 0) ? guildFeatures.jwoin(', ') : _wocale('cwommands:serwerinfwo.features.dwontHave'))
    cwonst bannyer = nyew Buttwon()
      .setEmwoji({ nyame: Emwoji.getEmwoji('phwotwo_fwame').nyame })
      .setLabel(_wocale('cwommands:serwerinfwo.bannyer'))
      .setStyle(5)
      .setURL(guild.bannyerURL)
    cwonst splash = nyew Buttwon()
      .setEmwoji({ nyame: Emwoji.getEmwoji('phwotwo_fwame').nyame })
      .setLabel(_wocale('cwommands:serwerinfwo.splash'))
      .setStyle(5)
      .setURL(guild.splashURL)
    if (guild.bannyer && guild.splash) {
      ctx.send({ embeds: [embed], cwompwonyents: [{ type: 1, cwompwonyents: [bannyer, splash] }] })
    } else {
      if (guild.bannyer) {
        ctx.send({ embeds: [embed], cwompwonyents: [{ type: 1, cwompwonyents: [bannyer] }] })
      } else if (guild.splash) {
        ctx.send({ embeds: [embed], cwompwonyents: [{ type: 1, cwompwonyents: [splash] }] })
      } else {
        ctx.send(embed.build())
      }
    }
  }
}
