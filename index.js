import dotenv from 'dotenv'
dotenv.config()
import Logger from './src/structures/util/Logger'
import Constants from './src/utils/Constants'
Constants.BUILD_INFO.commit_log()
import PluginManager from './src/utils/plugins/PluginManager'
import DatabaseStore from './src/utils/plugins/store/DatabaseStore'
import BotStore from './src/utils/plugins/store/BotStore'
import LavalinkStore from './src/utils/plugins/store/LavalinkStore'
import CacheProfile from './src/utils/plugins/cache/CacheProfile'
import BuildStore from './src/utils/plugins/store/BuildStore'

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
  return console.warn(warn)
})
process.on('uncaughtExceptionMonitor', (err) => {
  return console.error(err)
})
process.on('uncaughtException', (err) => {
  return console.error(err)
})