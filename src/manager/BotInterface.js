const Bot = require('../structures/Bot')
const Logger = require('../structures/util/Logger')
module.exports = class BotInterface {

  async spawnShards(pluginManager) {
    if (!process.env.DISCORD_TOKEN?.startsWith('Bot')) {
      Logger.error(`The token can't be prefix-less, please, use 'Bot ${process.env.DISCORD_TOKEN}'`)
      process.exit()
      return
    }
    this.shardManager = new Bot(process.env.DISCORD_TOKEN, {
      maxShards: parseInt(process.env.SHARD_AMOUNT),
      compress: true,
      defaultImageFormat: 'png',
      defaultImageSize: 2048,
      restMode: true,
      allowedMentions: {
        everyone: false,
        roles: false,
        users: true,
        repliedUser: true
      },
      intents: 14079
    })
    this.shardManager.pluginManager = pluginManager.$pluginManager
    this.shardManager.database = pluginManager.$pluginManager.pluginStore.get('mongodb')?.classState ?? undefined
    this.shardManager.lavalink = pluginManager.$pluginManager.pluginStore.get('lavalink')?.classState ?? undefined
    this.shardManager.player = new Map()
    try {
      await this.shardManager.connect().then(() => {
        Logger.debug('Successfully connected to Discord\'s gateway.')
      })
    } catch (e) {
      console.log(e)
    }
  }
}

