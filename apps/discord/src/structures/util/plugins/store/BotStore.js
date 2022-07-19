const PluginExtend = require('../loaders/PluginExtend')

module.exports = class BotStore extends PluginExtend {
  constructor() {
    super({
      name: 'bot',
      args: {},
      timeout: 50 * 1000,
    })
  }

  start() {
    try {
      if (process.env.CLUSTERS === 'true') {
        const Manager = require('../../../../sharder/manager/Manager')
        const manager = new Manager()
        manager.start()
      } else {
        const BotInterface = require('../../../../manager/BotInterface')
        this.$addClassState({ data: new BotInterface().spawnShards(this) })
      }

      this.ready()
    } catch (err) {
      console.log(err)
      this.fail(err)
    }
  }
}
