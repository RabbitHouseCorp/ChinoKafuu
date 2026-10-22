/* eslint-disable jest/require-hook */
import dotenv from 'dotenv'
import { APIProcess } from './src/structures/Process.js'
import { BUILD_INFO } from './src/structures/util/Constants.js'
import { Logger } from './src/structures/util/index.js'
import { PluginManager } from './src/structures/util/plugins/PluginManager.js'
import { CacheProfile } from './src/structures/util/plugins/cache/CacheProfile.js'
import { BotStore } from './src/structures/util/plugins/store/BotStore.js'
import { BuildStore } from './src/structures/util/plugins/store/BuildStore.js'
import { DatabaseStore } from './src/structures/util/plugins/store/DatabaseStore.js'

// Load packages global!
await import('./src/tools/JSONTools.js')
await import('./src/tools/Exception.js')
await import('./src/tools/StringBuilder.js')

dotenv.config({
  path: '../../.env'
})

APIProcess()

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