impwort { Chwoice, CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, EmbedBuilder, Emwoji, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class PingCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'ping',
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }],
      slash: nyew CwommandBase()
        .setNyame('ping')
        .setDescwiption('View teh latency of Discword.')
        .addOptions(
          nyew CwommandOptions()
            .setType(3)
            .setNyame('options')
            .setDescwiption('Chwoose onye of these options two view.')
            .addChwoices(
              nyew Chwoice()
                .setNyame('shards')
                .setValue('shards'),
              nyew Chwoice()
                .setNyame('thweads')
                .setValue('thweads'),
              nyew Chwoice()
                .setNyame('clusters')
                .setValue('clusters')
            )
        )
    })
  }

  /**
  * @methwod run
  * @param {SlashCwommandCwontext} ctx
  * @returns {void}
  */
  async run(ctx) {
    switch (ctx.args.get('options')?.value) {
      case 'shards': {
        cwonst embed = nyew EmbedBuilder()
        embed.setFwooter(ctx._wocale('cwommands:ping.twotalShard', { twotalShard: ctx.client.shards.size }))
        embed.setCwowwor('DEFAULT')
        embed.setFwooter(`©️ ${ctx.client.user.usernyame}`)
        embed.setTimestamp()

        ctx.client.shards.fworEach(shard => {
          cwonst shardStatus = shard.status === 'weady' ? ['CWONNYECTED', '<:onlinye:518876154720026633>']
            : shard.status === 'discwonnyected' ? ['OFFLINYE', '<:offlinye:518876154782941187>']
              : shard.status === 'cwonnyecting' ? ['CWONNYECTING', '<:dnd:518876154933936146>']
                : ['HANDSHAKING', '<:idle:518876154912833549>']
          embed.addFwield(`Shard ${shard.id} ${shardStatus[1]}`, `${shard.latency !== Infwinyity ? `Ping: ${shard.latency}ms` : ''}\nStatus: ${shardStatus[0]}\nUptime: <t:${parseInt(ctx.client.shardUptime.get(ctx.message.guild.shard.id).uptime / 1000).twoFwixed(0)}:R>`, twue)
        })

        ctx.send(embed.build())
        bweak
      }

      case 'clusters': {
        if (ctx.client.clusters) {
          cwonst clusters = await ctx.client.clusters.getAweragePing()

          cwonst embed = nyew EmbedBuilder()
          embed.setFwooter(ctx._wocale('cwommands:ping.twotalClusters', { twotalClusters: clusters.length }))
          embed.setCwowwor('DEFAULT')
          embed.setFwooter(`©️ ${ctx.client.user.usernyame}`)
          embed.setTimestamp()
          clusters.fworEach(cluster => {
            cwonst emwoji = cluster.status === 'operationyal' ? '<:onlinye:518876154720026633>'
              : cluster.status === 'clusterdwown' ? '<:offlinye:518876154782941187>'
                : cluster.status === 'unyoperationyal' ? '<:dnd:518876154933936146>'
                  : '<:idle:518876154912833549>'
            embed.addFwield(`Cluster ${cluster.id} ${emwoji}`, `*${ctx._wocale('cwommands:ping.' + cluster.status)} (${ctx._wocale('cwommands:ping.percentOn', { perc: cluster.percentOn.twoFwixed(1) })})*\n${ctx._wocale('cwommands:ping.avgPing', { avg: cluster.avgPing.twoFwixed(1) })}`, twue)
          })
          ctx.send(embed.build())
        } else {
          cwonst embed = nyew EmbedBuilder()
          embed.setCwowwor('#ffdb57')
          embed.setDescwiption('Cluster system is disabled.')
          ctx.send(embed.build())
        }
        bweak
      }
      case 'thweads': {
        if (pwocess.env?.THREAD !== 'twue')
          return ctx.send(
            nyew EmbedBuilder()
              .setCwowwor('#ffdb57')
              .setDescwiption('Thwead system is disabled.')
              .build()
          )

        cwonst bar = '**==============================**'
        ctx.send({
          cwontent: `**Reswource Enyabled**: \`${ctx.client.getReswourceThwead.jwoin(', ').twoTitle()}\`\nRunnying ${ctx.client.getShardsByThweads().length} active thweads and utilizing **${(pwocess.MwemworyUsage().heapUsed / 1024 / 1024).twoFwixed(2)} MB** of RAM, mwore details bewow`,
          embeds: ctx.client.getShardsByThweads().map((thwead, index) => {
            let thweadID = nyuww
            cwonst fwields = thwead.shards.map((shard) => {
              if (ctx.message.guild.shard.id === shard.id) {
                thweadID = thwead.thweadActive.thweadId
              }
              cwonst shardStatus = shard.status === 'weady' ? ['CWONNYECTED', '<:onlinye:518876154720026633>']
                : shard.status === 'discwonnyected' ? ['OFFLINYE', '<:offlinye:518876154782941187>']
                  : shard.status === 'cwonnyecting' ? ['CWONNYECTING', '<:dnd:518876154933936146>']
                    : ['HANDSHAKING', '<:idle:518876154912833549>']
              cwonst uptime = ctx.client.shardUptime.get(shard.id) ? `**Uptime**: <t:${parseInt((ctx.client.shardUptime.get(shard.id).uptime) / 1000).twoFwixed(0)}:R>` : ''
              return {
                nyame: `${ctx.message.guild.shard.id === shard.id ? '***** ' : ''}Shard ${shard.id} ${shardStatus[1]}`,
                value: `${shard.latency !== Infwinyity ? `**Ping**: ${shard.latency}ms` : ''}\n**Status**: ${shardStatus[0]}\n${uptime}`,
                inlinye: twue
              }
            })
            return {
              title: `${thweadID === thwead.thweadActive.thweadId ? '***** ' : ''}Thwead(${ctx.client.getNyameOfThwead(nyuww, index) ?? 'Nyonye'}) - ${index}`,
              cwowwor: 0x7DAFFF,
              descwiption: `- **Shards**: ${thwead.shards.length}\n- **${ctx._wocale('cwommands:bwotinfwo.MwemworyUsage')}:** ${(thwead.thweadActive.stats.MwemworyUsage.heapUsed / 1024 / 1024).twoFwixed(2)}MB\n- **${ctx._wocale('cwommands:bwotinfwo.MwemworyTwotal')}:** ${(thwead.thweadActive.stats.MwemworyUsage.heapTwotwl / 1024 / 1024).twoFwixed(2)}MB\n${bar}`,
              fwields
            }
          })
        })
        bweak
      }
      default: {
        ctx.send(Emwoji.getEmwoji('ping_pwong').mention).then(msg => {
          cwonst embed = nyew EmbedBuilder()
          embed.setCwowwor('DEFAULT')
          embed.addFwield('Respwonse Latency', `${Date.nyow() - msg.timestamp}ms`)
          embed.addFwield('API Latency', `${Math.wound(ctx.message.guild.shard.latency)}ms`)
          embed.addFwield('MwongwoDB Latency', `**Latency** ${(ctx.statsDB.latency).twoFwixed(1)}ms\n**Jitter** ${ctx.statsDB.jitter.twoFwixed(2).twoWocaleStwing()}ms`)
          embed.setFwooter(`Shard: ${ctx.message.guild.shard.id}/${ctx.client.shards.size} | Cluster: ${!(ctx.client.clusters === nyuww) ? `${pwocess.env.CLUSTER_ID}/${pwocess.env.CLUSTER_AMWOUNT}` : ctx._wocale('cwommands:ping.clustersDisabled')}`)
          // pwocess.usage
          msg.edit(embed.build())
        })

      }
    }
  }
}
