const { Command, EmbedBuilder, Emoji } = require('../../utils')
const moment = require('moment')
require('moment-duration-format')
module.exports = class PingCommand extends Command {
  constructor() {
    super({
      name: 'ping',
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  async run(ctx) {
    switch (ctx.args[0]) {
      case 'shards': {
        const embed = new EmbedBuilder()
        embed.setFooter(ctx._locale('commands:ping', { totalShard: ctx.client.shards.size }))
        embed.setColor('DEFAULT')
        embed.setFooter(`©️ ${ctx.client.user.username}`)
        embed.setTimestamp()

        ctx.client.shards.forEach(shard => {
          const shardStatus = shard.status === 'ready' ? ['CONNECTED', '<:online:518876154720026633>']
            : shard.status === 'disconnected' ? ['OFFLINE', '<:offline:518876154782941187>']
              : shard.status === 'connecting' ? ['CONNECTING', '<:dnd:518876154933936146>']
                : ['HANDSHAKING', '<:idle:518876154912833549>']
          embed.addField(`Shard ${shard.id} ${shardStatus[1]}`, `${shard.latency !== Infinity ? `Ping: ${shard.latency}ms` : ''}\nStatus: ${shardStatus[0]}\nUptime: ${moment.duration(Date.now() - ctx.client.shardUptime.get(shard.id).uptime).format("dd:hh:mm:ss", { stopTrim: "d" })}`, true)
        })

        ctx.send(embed.build())
        break
      }
      default: {
        const msg = await ctx.send(Emoji.getEmoji('ping_pong').mention)
        const ping = `Ping: \`${Math.round(ctx.message.channel.guild.shard.latency)}\`ms! | API Latency: \`${Date.now() - msg.timestamp}\` | Shard: [${ctx.message.channel.guild.shard.id}/${ctx.client.shards.size}] | Cluster ${process.env.CLUSTER_ID}`
        await msg.edit(`${Emoji.getEmoji('ping_pong').mention}\n${ping}`)
      }
    }
  }
}
