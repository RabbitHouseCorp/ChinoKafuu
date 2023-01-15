/* eslint-disable jest/require-hook */
import dotenv from 'dotenv'
import { Logger } from './src/structures/util/index'
import { BUILD_INFO } from './src/structures/util/Constants'
import { CacheProfile } from './src/structures/util/plugins/cache/CacheProfile'
import { PluginManager } from './src/structures/util/plugins/PluginManager'
import { BotStore } from './src/structures/util/plugins/store/BotStore'
import { BuildStore } from './src/structures/util/plugins/store/BuildStore'
import { DatabaseStore } from './src/structures/util/plugins/store/DatabaseStore'
import { LavalinkStore } from './src/structures/util/plugins/store/LavalinkStore'

// Load packages global!
await import('./src/tools/JSONTools')
await import('./src/tools/Exception')
await import('./src/tools/StringBuilder')

dotenv.config({
  path: '../../.env'
})
BUILD_INFO.commit_log()

class StateApplication {
  constructor(state) {
    this.state = state ?? {}

  }

  // Start ChinoKafuu/Discord
  start() {
    const pluginManager = new PluginManager()

    pluginManager.addPlugins(
      new CacheProfile(),
      new BuildStore(),
      new DatabaseStore(),
      new LavalinkStore(),
      new BotStore()
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
  }
}

new StateApplication().start()