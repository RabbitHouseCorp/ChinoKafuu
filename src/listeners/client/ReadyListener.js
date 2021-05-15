const Listener = require('../../structures/events/Listener')
const LavalinkManager = require('../../lavalink/LavalinkManager')
const { TopGGUtils, Logger } = require('../../utils')
module.exports = class ReadyListener extends Listener {
  constructor() {
    super()

    this.event = 'ready'
  }

  async on(client) {
    const top_gg = new TopGGUtils()
    await top_gg.post(client)
    const lavalink = new LavalinkManager(client)
    client.lavalink = lavalink
    client.player = new Map()
    await lavalink.connect()
    const game = [
      { name: 'Petit Rabbit\'s - Tokimeki Poporon', type: 2 },
      { name: 'Petit Rabbit\'s - Daydream café', type: 2 },
      { name: 'Petit Rabbit\'s - Tenkuu Cafetaria' },
      { name: 'Petit Rabbit\'s - No Poi', type: 2 },
      { name: 'Gochuumon wa Usagi Desu Ka?', type: 3 },
      { name: 'Gochuumon wa Usagi Desu ka??: Sing for You', type: 3 },
      { name: 'Gochuumon wa Usagi Desu Ka? BLOOM', type: 3 },
      { name: 'Okaeri to Rabbit House Coffee.', type: 0 },
      { name: '🐦 Follow me in twitter: @ChinoKafuuBot', type: 0 },
      { name: `If you need support, use ${process.env.BOT_PREFIX}help`, type: 1, url: 'https://twitch.tv/danielagc' },
      { name: 'Drink a tea on Fleur de Lapin', type: 1, url: 'https://twitch.tv/danielagc' },
      { name: 'Lapin The Phantom Thief', type: 3 }
    ]

    setInterval(() => {
      const status = Math.floor(Math.random() * game.length)
      client.editStatus('dnd', game[status])
    }, 5000)
    Logger.info(`Shards from ${client.clusters.firstShardID} - ${Number(client.clusters.firstShardID) + Number(process.env.SHARDS_PER_CLUSTER)} are online.`)
  }
}
