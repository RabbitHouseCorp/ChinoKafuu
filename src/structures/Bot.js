const { Client } = require('eris')
const ListenerRegistry = require('./events/ListenerRegistry')
const CommandRegistry = require('./command/CommandRegistry')
const I18NRegistry = require('./i18n/I18NRegistry')
const ClusteringInterface = require('./util/ClusteringInterface')
const Database = require('./database/Database')
const PolluxClient = require('./util/PolluxClient')

module.exports = class Bot extends Client {
  constructor (...data) {
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
         *
         * @type {PolluxClient}
         */
    this.polluxClient = new PolluxClient()
  }
}
