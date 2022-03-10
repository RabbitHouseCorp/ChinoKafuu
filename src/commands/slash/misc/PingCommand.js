const { Command, EmbedBuilder, Emoji } = require('../../../structures/util')
const { CommandBase, CommandOptions, Choice } = require('eris')

module.exports = class PingCommand extends Command {
  constructor() {
    super({
      name: 'ping',
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }],
      slash: new CommandBase()
        .setName('ping')
        .setDescription('View the latency of Discord.')
        .addOptions(
          new CommandOptions()
            .setType(3)
            .setName('options')
            .setDescription('Choose one of these options to view.')
            .addChoices(
              new Choice()
                .setName('shards')
                .setValue('shards'),
              new Choice()
                .setName('clusters')
                .setValue('clusters')
            )
        )
    })
  }

  async run(ctx) {
    const time = Date.now() - ctx.ms
    switch (ctx.args.get('options')?.value) {
      case 'shards': {
        const embed = new EmbedBuilder()
        embed.setFooter(ctx._locale('commands:ping.totalShard', { totalShard: ctx.client.shards.size }))
        embed.setColor('DEFAULT')
        embed.setFooter(`©️ ${ctx.client.user.username}`)
        embed.setTimestamp()

        ctx.client.shards.forEach(shard => {
          const shardStatus = shard.status === 'ready' ? ['CONNECTED', '<:online:518876154720026633>']
            : shard.status === 'disconnected' ? ['OFFLINE', '<:offline:518876154782941187>']
              : shard.status === 'connecting' ? ['CONNECTING', '<:dnd:518876154933936146>']
                : ['HANDSHAKING', '<:idle:518876154912833549>']
          embed.addField(`Shard ${shard.id} ${shardStatus[1]}`, `${shard.latency !== Infinity ? `Ping: ${shard.latency}ms` : ''}\nStatus: ${shardStatus[0]}\nUptime: <t:${parseInt(ctx.client.shardUptime.get(ctx.message.guild.shard.id).uptime / 1000).toFixed(0)}:R>`, true)
        })

        ctx.send(embed.build())
        break
      }

      case 'clusters': {
        if (ctx.client.clusters) {
          const clusters = await ctx.client.clusters.getAveragePing()

          const embed = new EmbedBuilder()
          embed.setFooter(ctx._locale('commands:ping.totalClusters', { totalClusters: clusters.length }))
          embed.setColor('DEFAULT')
          embed.setFooter(`©️ ${ctx.client.user.username}`)
          embed.setTimestamp()
          clusters.forEach(cluster => {
            const emoji = cluster.status === 'operational' ? '<:online:518876154720026633>'
              : cluster.status === 'clusterdown' ? '<:offline:518876154782941187>'
                : cluster.status === 'unoperational' ? '<:dnd:518876154933936146>'
                  : '<:idle:518876154912833549>'
            embed.addField(`Cluster ${cluster.id} ${emoji}`, `*${ctx._locale('commands:ping.' + cluster.status)} (${ctx._locale('commands:ping.percentOn', { perc: cluster.percentOn.toFixed(1) })})*\n${ctx._locale('commands:ping.avgPing', { avg: cluster.avgPing.toFixed(1) })}`, true)
          })
          ctx.send(embed.build())
        } else {
          const embed = new EmbedBuilder()
          embed.setColor('#ffdb57')
          embed.setDescription('Cluster system is disabled.')
          ctx.send(embed.build())
        }
        break
      }
      default: {
        ctx.send(Emoji.getEmoji('ping_pong').mention).then(msg => {
          const embed = new EmbedBuilder()
          embed.setColor('DEFAULT')
          embed.addField('Response Latency', `${Date.now() - msg.timestamp}ms`)
          embed.addField('API Latency', `${Math.round(ctx.message.guild.shard.latency)}ms`)
          embed.addField('MongoDB Latency', `${(time).toFixed(1)}ms`)
          if (ctx.client.interactionPost != null) {
            embed.addField('Interaction Latency', `${ctx.client.interactionPost.ping}ms **(Last latency ${ctx.client.interactionPost.lastPing}ms)**`)
          }
          embed.setFooter(`Shard: ${ctx.message.guild.shard.id}/${ctx.client.shards.size} | Cluster: ${!(ctx.client.clusters === null) ? `${process.env.CLUSTER_ID}/${process.env.CLUSTER_AMOUNT}` : ctx._locale('commands:ping.clustersDisabled')}`)
          process.usage
          msg.edit(embed.build())
        })

      }
    }
  }
}
