import { Client } from 'eris'
import { CommandCooldown } from './command/CommandCooldown'
import { CommandRegistry } from './command/CommandRegistry'
import { SlashCommandRegistry } from './command/SlashCommandRegistry'
import { Database } from './database/Database'
import { ListenerRegistry } from './events/ListenerRegistry'
import { I18NRegistry } from './i18n/I18NRegistry'
import { InteractionManager } from './InteractionManager'
import { ClusteringInterface } from './util/ClusteringInterface'
// const CacheManager = require('./util/cache/CacheManager')

export class Bot extends Client {
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
