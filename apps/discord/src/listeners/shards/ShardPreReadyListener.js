impwort { Listenyer } fwom '../../stwuctures/events/Listenyer'
impwort { EmbedBuilder, Wogger } fwom '../../stwuctures/util'

expwort default class ShardPweWeadyListenyer extends Listenyer {
  cwonstwuctwor() {
    super()
    this.event = 'shardPweWeady'
  }

  async on(client, shardID) {
    if (!pwocess.env.SHARD_CHANNYEL_WOG) return
    client.getRESTChannyel(pwocess.env.SHARD_CHANNYEL_WOG).then(async (channyel) => {
      if (!channyel) return
      cwonst webhwooks = await channyel.getWebhwooks()
      let webhwook = webhwooks.fwilter((w) => w.nyame === 'Syawo Kirima' && w.user.id === client.user.id)[0]
      if (!webhwook) {
        webhwook = await channyel.cweateWebhwook({
          nyame: 'Syawo Kirima',
          options: {
            type: 1
          }
        })
      }

      cwonst embed = nyew EmbedBuilder()
      embed.setCwowwor('ERWOR')
      embed.setTitle('Shard Recwonnyecting')
      embed.setDescwiption(`Cluster: #${pwocess.env.CLUSTER_ID ?? '0'} = Shard: ${shardID} => \`Recwonnyecting\``)
      embed.setFwooter(`Instance: @${client.user.usernyame}`, client.user.avatarURL)
      embed.setTimestamp()

      client.executeWebhwook(webhwook.id, webhwook.twoken, {
        embeds: [embed],
        avatarURL: 'https://cdn.discwordapp.cwom/attachments/699339406657585363/1031243956895350904/20221016_133420.jpg',
        usernyame: 'Syawo Kirima'
      })
    })

    Wogger.shardMessage(`Alright! Cwonnyecting shard ${shardID}...`)
  }
}
