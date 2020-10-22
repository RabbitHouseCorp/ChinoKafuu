const EmbedBuilder = require('../../structures/util/EmbedBuilder')
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
        const s = []
        const embed = new EmbedBuilder()
        embed.setFooter(ctx.t('commands:ping', { totalShard: ctx.client.shards.size }))
        embed.setColor('DEFAULT')
        ctx.client.shards.forEach(shard => {
          let shardStatus
          if (shard.status === 'ready') shardStatus = 'CONNECTED'
          if (shard.status === 'disconnected') shardStatus = 'DISCONNECTED'
          if (shard.status === 'connecting') shardStatus = 'CONNECTING'
          if (shard.status === 'handshaking') shardStatus = 'HANDSHAKING'
          s.push(embed.addField(`Shard: ${shard.id}`, `Ping: ${shard.latency} | ${shardStatus}`, true))
        })

        ctx.send(embed)
        break
      }
      default: {
        const ping = `Ping: \`${Math.round(ctx.message.channel.guild.shard.latency)}\`ms! | API Latency: \`${Date.now() - ctx.message.timestamp}\` | Shard: [${ctx.message.channel.guild.shard.id}/${ctx.client.shards.size}]`
        const msg = await ctx.send(':ping_pong:')
        await msg.edit(`:ping_pong:\n${ping}`)
      }
    }
  }
}

module.exports = PingCommand
