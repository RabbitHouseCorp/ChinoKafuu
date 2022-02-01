// Load packages global!
require('./src/tools/JSONTools')
require('./src/tools/Exception')
require('./src/tools/StringBuilder')
const dotenv = require('dotenv')
dotenv.config()
const Logger = require('./src/structures/util/Logger')
const Constants = require('./src/utils/Constants')
Constants.BUILD_INFO.commit_log()
const PluginManager = require('./src/utils/plugins/PluginManager')
const DatabaseStore = require('./src/utils/plugins/store/DatabaseStore')
const BotStore = require('./src/utils/plugins/store/BotStore')
const LavalinkStore = require('./src/utils/plugins/store/LavalinkStore')
const CacheProfile = require('./src/utils/plugins/cache/CacheProfile')
const BuildStore = require('./src/utils/plugins/store/BuildStore')

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