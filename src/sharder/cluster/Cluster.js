const Logger = require('../../structures/util/Logger')
const Bot = require('../../structures/Bot')

module.exports = class Cluster {
  constructor () {
    Logger.info('Online. Spawning shards...')
    if (process.env.PRODUCTION === 'true' && !process.env.MONGO_URI) {
      Logger.error('Production mode enabled without a database URI! Make sure MONGO_URI is in your .env file.')
    }
    if (process.env.PRODUCTION === 'false' && !process.env.MONGO_URI) {
      Logger.warning('Starting application without MONGO_URI in .env.')
    }
    this.spawnShards()
  }

  async spawnShards () {
    this.shardManager = new Bot(process.env.DISCORD_TOKEN, {
      firstShardID: this.firstClusterShardID,
      lastShardID: this.firstClusterShardID + (parseInt(process.env.SHARDS_PER_CLUSTER) - 1),
      maxShards: parseInt(process.env.SHARD_AMOUNT),
      defaultImageFormat: 'png',
      defaultImageSize: 2048,
      getAllUsers: false,
      restMode: true,
      allowedMentions: {
        everyone: false,
        roles: false,
        users: true,
        repliedUser: true
      },
      intents: [
        'guilds',
        'guildMembers',
        'guildBans',
        'guildEmojis',
        'guildIntegrations',
        'guildWebhooks',
        'guildInvites',
        'guildVoiceStates',
        'guildMessages',
        'guildMessageReactions',
        'directMessages',
        'directMessageReactions'
      ],
      /* disableEvents: {
        CHANNEL_CREATE: true,
        CHANNEL_DELETE: true,
        CHANNEL_UPDATE: true,
        GUILD_BAN_ADD: true,
        GUILD_BAN_REMOVE: true,
        GUILD_MEMBER_ADD: true,
        GUILD_MEMBER_REMOVE: true,
        GUILD_MEMBER_UPDATE: true,
        GUILD_ROLE_CREATE: true,
        GUILD_ROLE_DELETE: true,
        GUILD_ROLE_UPDATE: true,
        GUILD_UPDATE: true,
        MESSAGE_DELETE: true,
        MESSAGE_DELETE_BULK: true,
        PRESENCE_UPDATE: true,
        TYPING_START: true,
        USER_UPDATE: true
      } */
    })

    try {
      await this.shardManager.connect().then(() => {
        Logger.debug('Successfully connected to Discord\'s gateway.')
      })
    } catch (e) { }
  }

  get firstClusterShardID () {
    if (process.env.CLUSTER_ID === '0') return 0
    return parseInt(process.env.CLUSTER_ID) * parseInt(process.env.SHARDS_PER_CLUSTER)
  }
}
