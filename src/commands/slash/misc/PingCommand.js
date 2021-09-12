const { Command, EmbedBuilder, Emoji } = require('../../../utils')

const moment = require('moment')
require('moment-duration-format')
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
          embed.addField(`Shard ${shard.id} ${shardStatus[1]}`, `${shard.latency !== Infinity ? `Ping: ${shard.latency}ms` : ''}\nStatus: ${shardStatus[0]}\nUptime: ${moment.duration(Date.now() - ctx.client.shardUptime.get(ctx.message.guild.shard.id).uptime).format('dd:hh:mm:ss', { stopTrim: 'd' })}`, true)
        })

        ctx.send(embed.build())
        break
      }

      case 'clusters': {
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
        break
      }
      default: {
        const msg = await ctx.send(Emoji.getEmoji('ping_pong').mention)
        const embed = new EmbedBuilder()
        embed.setColor('DEFAULT')
        embed.addField('Response Latency', `${Date.now() - msg.timestamp}ms`)
        embed.addField('API Latency', `${Math.round(ctx.message.guild.shard.latency)}ms`)
        embed.addField('MongoDB Latency', `${(Date.now() - ctx.ms).toFixed(1)}ms`)
        embed.setFooter(`Shard: ${ctx.message.guild.shard.id}/${ctx.client.shards.size} | Cluster: ${process.env.CLUSTER_ID}/${process.env.CLUSTER_AMOUNT}`)

        msg.edit(embed.build())
      }
    }
  }
}
