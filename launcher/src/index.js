const { PlatformPackage } = require('./Platform')
const Discord = require('./platforms/Discord')
const Revolt = require('./platforms/Revolt')
class Runner {
  constructor() {
    this.platformManager = new PlatformPackage.PlatformManager()
  }

  register() {
    this.platformManager.addPlatform([
      new Discord(this),
      new Revolt(this)
    ])

    for (const p of this.platformManager.platforms) {
      this.platformManager.platforms.get(p[0]).runner()
    }
  }
}

module.exports.Run = () => {
  // Adding delay for execute others functions.
  const RunnerManager = new Runner()
  setTimeout(() => RunnerManager.register(), 1 * 1000)
  const Wrapper = new (require('../../projectwrapper.build'))(RunnerManager.platformManager)

  Wrapper.runner()
}