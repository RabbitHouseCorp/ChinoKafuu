// Load packages global!
require('./src/tools/JSONTools')
require('./src/tools/Exception')
require('./src/tools/StringBuilder')
const dotenv = require('dotenv')
dotenv.config()
const Logger = require('./src/structures/util/Logger')
const Constants = require('./src/structures/util/Constants')
Constants.BUILD_INFO.commit_log()
const PluginManager = require('./src/structures/util/plugins/PluginManager')
const DatabaseStore = require('./src/structures/util/plugins/store/DatabaseStore')
const BotStore = require('./src/structures/util/plugins/store/BotStore')
const LavalinkStore = require('./src/structures/util/plugins/store/LavalinkStore')
const CacheProfile = require('./src/structures/util/plugins/cache/CacheProfile')
const BuildStore = require('./src/structures/util/plugins/store/BuildStore')

// BotStore
const pluginManager = new PluginManager()

pluginManager.addPlugins(
  new CacheProfile(),
  new BuildStore(),
  new DatabaseStore(),
  new LavalinkStore(),
  new BotStore(),
)

process.on('warning', (warn) => {
  return Logger.warning(warn.debug().removePath())
})
process.on('uncaughtExceptionMonitor', (err) => {
  return Logger.error(err.debug().removePath())
})
process.on('uncaughtException', (err) => {
  return Logger.error(err.debug().removePath())
})