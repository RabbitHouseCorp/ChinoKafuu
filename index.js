require('dotenv').config()
const Logger = require('./src/structures/util/Logger')
const Constants = require('./src/utils/Constants')
Constants.BUILD_INFO.commit_log()
const PluginManager = require('./src/utils/plugins/PluginManager');
const DatabaseStore = require('./src/utils/plugins/store/DatabaseStore');
const BotStore = require('./src/utils/plugins/store/BotStore');
const LavalinkStore = require('./src/utils/plugins/store/LavalinkStore');
const BuildStore = require('./src/utils/plugins/store/BuildStore');

// BotStore
const pluginManager = new PluginManager()

pluginManager.addPlugins(
  new BuildStore(),
  new DatabaseStore(),
  new LavalinkStore(),
  new BotStore(),
)

process.on('warning', (warn) => {
  return console.warn(warn)
})
process.on('uncaughtExceptionMonitor', (err) => {
  return console.error(err)
})
process.on('uncaughtException', (err) => {
  return console.error(err)
})