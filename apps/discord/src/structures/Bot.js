import { Client } from 'eris'
import { CommandCooldown } from './command/CommandCooldown'
import { CommandRegistry } from './command/CommandRegistry'
import { SlashCommandRegistry } from './command/SlashCommandRegistry'
import { Database } from './database/Database'
import { ListenerRegistry } from './events/ListenerRegistry'
import { I18NRegistry } from './i18n/I18NRegistry'
import { InteractionManager } from './InteractionManager'
import { InteractionManagerHttp } from './InteractionManagerHttp'
import { InteractionFunctionRegistry } from './othersRegistry/InteractionFunctionRegistry'
import { ClusteringInterface } from './util/ClusteringInterface'
// const CacheManager = require('./util/cache/CacheManager')

/**
 * @typedef SubCommandGlobalUi
 * @property {number} type
 * @property {string} name
 * @property {description} description
 * @property {boolean?} required
 * @property {boolean?} autocomplete
 */

/**
 * @typedef CommandGlobalUi
 * @property {string} name
 * @property {string} id
 * @property {boolean  | null | undefined} dm_permission
 * @property {boolean  | null | undefined} default_permission
 * @property {SubCommandGlobalUi[] | null | undefined} options
 * @property {boolean  | null | undefined} nsfw
 * @property {string} version
 */

export class Bot extends Client {
  constructor(...data) {
    super(...data)
    this.startShard = 0
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
     * @type {InteractionFunctionRegistry}
     */
    this.interactionRegistry = new InteractionFunctionRegistry()
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
    /**
    * @description Perhaps this will be deprecated or will be used very soon by a repository rewrite.
    */
    this.interactionPost = new InteractionManagerHttp(this)
    /**
     * @description To manage Bot interactions. Not just commands, it can manage buttons and menu and modal selection
     */
    this.interactionManager = new InteractionManager(this)
    /**
     * @description
     * @type {CommandGlobalUi[]}
     */
    this.commands = []
  }

  loadDatabase() {
    if (this.database === undefined) {
      this.database = new Database()
    }
  }
}
