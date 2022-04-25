const { Client } = require('eris')
const ListenerRegistry = require('./events/ListenerRegistry')
const CommandRegistry = require('./command/CommandRegistry')
const I18NRegistry = require('./i18n/I18NRegistry')
const ClusteringInterface = require('./util/ClusteringInterface')
const Database = require('./database/Database')
const CommandCooldown = require('./command/CommandCooldown')
const SlashCommandRegistry = require('./command/SlashCommandRegistry')
const InteractionManager = require('./InteractionManager')
// const CacheManager = require('./util/cache/CacheManager')

module.exports = class Bot extends Client {
  constructor(...data) {
    super(...data)
    this.startShard = 0
    this.options.ws

    // this.cacheManager = new CacheManager(this)
    /**
         *
         * @type {ListenerRegistry}
         */
    this.listenerRegistry = new ListenerRegistry(this)
    /**
         *
         * @type {I18NRegistry}
         */
    this.i18nRegistry = new I18NRegistry()
    /**
         *
         * @type {CommandRegistry}
         */
    this.commandRegistry = new CommandRegistry()
    /**
     *
     * @type {SlashCommandRegistry}
     */
    this.slashCommandRegistry = new SlashCommandRegistry()
    /**
         *
         * @type {ClusteringInterface}
         */
    if (process.env.CLUSTERS === 'true') {
      this.clusters = new ClusteringInterface(this)
    } else {
      this.clusters = null
    }
    /**
         *
         * @type {Database}
         */
    if (this.database === undefined) {
      this.database = new Database()
    }
    /**
         *
         * @type {Map}
         */
    this.shardUptime = new Map()

    /**
          * @type {CommandCooldown}
          * @description This class is for blocking access to commands globally and Soon will have future implementations
          */
    this.commandCooldown = new CommandCooldown()

    this.interactionPost = new InteractionManager(this)

  }

  get size() {
    if (process.env.PRODUCTION === 'false') {
      const parseJsonData = JSON.stringify(this)
      const buf = Buffer.from(parseJsonData)
      return {
        lengthEris: buf.length,
        lengthBuffer: buf.byteLength
      }
    }
    return {
      lengthEris: 0,
      lengthBuffer: 0
    }
  }
}
