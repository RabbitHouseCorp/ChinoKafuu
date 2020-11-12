const { EmbedBuilder } = require('../../utils')
const Command = require('../../structures/command/Command')
class PingCommand extends Command {
  constructor() {
    super({
      name: 'ping'
    })
  }

  async run(ctx) {
    switch (ctx.args[0]) {
      case 'shards': {
        const embed = new EmbedBuilder()
        embed.setFooter(ctx.t('commands:ping', { totalShard: ctx.client.shards.size }))
        embed.setColor('DEFAULT')
        ctx.client.shards.forEach(shard => {
          const shardStatus = shard.status === 'ready' ? ['CONNECTED', '<:online:518876154720026633>']
            : shard.status === 'disconnected' ? ['OFFLINE', '<:offline:518876154782941187>']
              : shard.status === 'connecting' ? ['CONNECTING', '<:dnd:518876154933936146>']
                : ['HANDSHAKING', '<:idle:518876154912833549>']
          embed.addField(`Shard ${shard.id} ${shardStatus[1]}`, `${shard.latency !== Infinity ? 'Ping: ' + shard.latency + 'ms |' : ''} ${shardStatus[0]}`)
        })

        ctx.send(embed)
        break
      }
      default: {
        const ping = `Ping: \`${Math.round(ctx.message.channel.guild.shard.latency)}\`ms! | API Latency: \`${Date.now() - ctx.message.timestamp}\` | Shard: [${ctx.message.channel.guild.shard.id}/${ctx.client.shards.size}] | Cluster ${process.env.CLUSTER_ID}`
        const msg = await ctx.send(':ping_pong:')
        await msg.edit(`:ping_pong:\n${ping}`)
      }
    }
  }
}

module.exports = PingCommand
