const { Client } = require('eris')
const ListenerRegistry = require('./events/ListenerRegistry')
const CommandRegistry = require('./command/CommandRegistry')
const I18NRegistry = require('./i18n/I18NRegistry')
const ClusteringInterface = require('./util/ClusteringInterface')
const Database = require('./database/Database')
const CommandCooldown = require('./command/CommandCooldown')
const SlashCommandRegistry = require("./command/SlashCommandRegistry");

module.exports = class Bot extends Client {
  constructor(...data) {
    super(...data)

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
    this.clusters = new ClusteringInterface(this)
    /**
         *
         * @type {Database}
         */
    this.database = new Database()
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

  }
}
